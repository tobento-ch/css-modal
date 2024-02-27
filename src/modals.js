const modals = (function(window, document) {
    'use strict';
    
    class Modal {
        constructor({
            id,
            modalEl,
            closeTriggers = '.modal-background, .modal-close',
            scroll = 'hidden', // 'visible', 'hidden' or null
        }) {            
            this.id = id;
            this.modalEl = modalEl;
            this.config = { closeTriggers, scroll };
            this.isOpen = false;
            this.listeners = {};
            this.documentClickListener = (e) => {
                if (e.target.closest('.modal') === null) {
                    this.close();
                }
            };
            this.init();
        }
        init() {
            (this.modalEl.querySelectorAll(this.config.closeTriggers) || []).forEach((el) => {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.close();
                });
            });
        }
        open() {
            if (this.isOpen) {
                return;
            }
            
            this.fire('open');
            this.isOpen = true;
            this.modalEl.classList.add('active');
            
            if (this.config.scroll === 'hidden') {
                document.querySelector('html').classList.add('modal-noscroll');
            } else if (this.config.scroll === 'visible') {
                document.getElementsByTagName('html')[0].style.overflow = 'hidden';
                document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
            }
            
            setTimeout(() => {
                document.addEventListener('click', this.documentClickListener, false);
            }, 150);
            
            this.fire('opened');
        }       
        close() {
            this.fire('close');
            this.isOpen = false;
            this.modalEl.classList.remove('active');
            
            if (this.config.scroll === 'hidden') {
                document.querySelector('html').classList.remove('modal-noscroll');
            } else if (this.config.scroll === 'visible') {
                document.getElementsByTagName('html')[0].style.overflow = '';
                document.getElementsByTagName('body')[0].style.overflowY = '';
            }
            
            document.removeEventListener('click', this.documentClickListener, false);
            
            this.fire('closed');
        }
        listen(eventName, callback) {
            if (typeof this.listeners[eventName] === 'undefined') {
                this.listeners[eventName] = [];
            }
            
            this.listeners[eventName].push(callback);
        }
        fire(eventName) {
            if (typeof this.listeners[eventName] === 'object') {
                this.listeners[eventName].forEach(el => {
                    if (typeof el === 'function') {
                        el(this);
                    }
                });
            }
        }
    }

    const modals = {
        items: {},
        register: function() {
            const triggers = document.querySelectorAll('[data-modal-trigger]');
            const modals = document.querySelectorAll('[data-modal]');

            triggers.forEach(el => {
                const id = el.getAttribute('data-modal-trigger');
                el.removeAttribute('data-modal-trigger');
                el.addEventListener('click', (e) => {
                    if (this.has(id)) {
                        e.preventDefault();
                        this.get(id).open();
                    }
                });
            });
            
            modals.forEach(el => {
                const config = JSON.parse(el.getAttribute('data-modal'));
                
                if (typeof config['id'] === 'undefined') {
                    return;
                }
                
                el.removeAttribute('data-modal');
                el.setAttribute('data-modal-id', config['id']);
                
                if (this.has(config['id'])) {
                    return;
                }
                
                config['modalEl'] = el;
                this.set(config['id'], new Modal(config));
            });
        },
        set: function(id, obj) {
            this.items[id] = obj;
        },
        get: function(id) {
            return this.items[id];
        },
        has: function(id) {
            return (typeof this.items[id] === 'undefined') ? false : true;
        }
    };
    
    document.addEventListener('DOMContentLoaded', (e) => {
        modals.register();
    });
    
    return modals;
    
})(window, document);

export default modals;