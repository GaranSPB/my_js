class Modal {

            constructor (options){
                let _m = this,
                    $body = $('body'),
                    defaults = {
                        title : '',
                        body : '',
                        closeCross : true,
                        closeBg : true,
                        buttons : [],
                        bgClass : ''
                    },
                    {closeBg,title,body,closeCross,buttons,bgClass} = Object.assign(defaults,options);
                _m.events = {
                    close : target => !target.is('.modal-class__disabled') ?  _m.hide() : void(0)
                };
                _m.opt = options;
                _m.$bg = $(`<div class="modal-class__bg ${bgClass}"></div>`);
                _m.$wrapper = $(`<div class="modal-class__wrapper"  ${(closeBg ? 'modal-event="close"' : '')}></div>'`);
                _m.$container = $(`<div class="modal-class__container">${(closeCross ? '<div class="modal-class__close" modal-event="close"></div>' : '')}</div>`);
                _m.$header = title ? $(`<div class="modal-class__header"></div>`).append(title) : '';
                _m.$body = $(`<div class="modal-class__body"></div>`).append(body);
                _m.$buttonSet = $('<div class="modal-class__buttons"></div>');
                _m.$basicButton = $('<div class="modal-class__button"></div>');
                _m.baseCSS = ".modal-fscreen-open{overflow:hidden!important} .modal-class__bg {position: fixed;display: none;top: 0;left: 65px;width: calc(100% - 65px);height: 100%;z-index: 1000;background-color: rgba(0, 0, 0, 0.6);}  .modal-class__wrapper {width: 100%;height: 100%;display: flex;justify-content: center;flex-direction: column;}  .modal-class__container {width: 100%;height: 100%;background-color: #fff;align-self: center;padding: 0;position: relative;}  .modal-class__close::before, .modal-class__close::after {content: '';width: 2px;height: 19px;background-color: #4077d6;position: absolute;top: 0;left: 8px;transform: rotate(-45deg);transition: 0.2s;}  .modal-class__close::after {transform: rotate(45deg);}  .modal-class__close {top: 20px;right: 20px;position: absolute;width: 19px;height: 19px;}  .modal-class__header {padding-right: 40px;font-size: 18px;font-weight: bold;margin-bottom: 20px;}  .modal-class__close:hover {cursor: pointer;}  .modal-class__body {margin-bottom: 20px;min-height: 20px;}  .modal-class__button {background-color: #4077d6;color: #fff;padding: 10px 20px;border-radius: 4px;font-weight: bold;}  .modal-class__button:hover {cursor: pointer;}  .modal-class__buttons {display: flex;}  .modal-class__button + .modal-class__button {margin-left: 10px;}  .modal-class__button.modal-class__disabled{background-color: #aaa;}  .modal-class__button.modal-class__disabled:hover{cursor: default;}  .modal-class__body-select {width: 400px;border: 1px solid #ccc;padding: 5px;border-radius: 4px;}";
                !$('#modal-class-css-block')[0] ? $body.append(`<style id="modal-class-css-block">${_m.baseCSS}</style>`) : void(0);
                _m.$container.append(_m.$header).append(_m.$body).append(_m.$buttonSet);
                _m.$wrapper.append(_m.$container);
                _m.$bg.append(_m.$wrapper);
                _m.parseButtons(buttons);
                _m.$bg.on('click','[modal-event]', e => {e.stopPropagation(); $(e.target).attr('modal-event') ? _m.events[$(e.target).attr('modal-event')]($(e.target)) : void(0)});
				if(!$(`.modal-class__bg.${bgClass}`).length)
					$body.append(_m.$bg);
            }
            parseButtons(buttons) {
                let _m = this;
                buttons.forEach( ({text,close,callback,disabled}) => {
                    let $newButton = _m.$basicButton.clone();
                    disabled ? $newButton.addClass('modal-class__disabled') : void(0);
                    close ? $newButton.attr('modal-event','close') : void(0);
                    callback ? $newButton.click( e => $(e.target).is('.modal-class__disabled') ? void(0) : callback(_m)) : void(0);
                    _m.$buttonSet.append($newButton.text(text));
                });
            }

            show() {
                let cb = this.opt.showCallback;
                this.$bg.fadeIn(600, () => (cb ? cb(this) : void(0)));
            }

            hide() {
                let cb = this.opt.closeCallback;
                this.$bg.fadeOut(600, () => (cb ? cb(this) : void(0)));
            }
            getButton (n) {
                return this.$buttonSet.children().eq(n);
            }
            toggleButton (n) {
                this.getButton(n).toggleClass('modal-class__disabled');
            }
            disableButton (n) {
                this.getButton(n).addClass('modal-class__disabled');
            }
            enableButton (n) {
                this.getButton(n).removeClass('modal-class__disabled');
            }
        }
