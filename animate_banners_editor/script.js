const form = $('#form'),
    buttons = form.find('button'),
    canvas = $('#canvas'),
    projectWrapper = $('#project'),
    prevButton = $('#pb'),
    nextButton = $('#nb'),
    slideName = $('#sn'),
    jsonArea = $('#json'),
    slidesWrapper = projectWrapper.find('.slides');


const l = (arg,...args) => {console.log(arg !== undefined ? args[0] !== undefined ? [arg,...args] : arg : 'empty log');}

const serializeObj = $form => $form.serializeArray().reduce( (r,el) => { r[el.name] = el.value; return r },{});

const renderSlide = name => `<li>${name}</li>`;

const disNode = ($button,bool) => {
    bool ? $button.prop('disabled',true) : $button.prop('disabled',false);
    return $button;
};

const toLS = (key,data) => localStorage.setItem(key,JSON.stringify(data));

const fromLS = (key,def) => localStorage.getItem(key) !== null ? JSON.parse(localStorage.getItem(key)) : def;

const idExist = id => document.getElementById(id) !== null;

let project = fromLS('project',{
        slides : {
            init : {
                current_slide : 'init'
            }
        }
    }),
    slides = $.map(project.slides, slide => slide.current_slide),
    currentSlide = fromLS('currentSlide','init'),
    currentSlideId = slides.indexOf(currentSlide),
    temp = fromLS('temp');

if(currentSlideId === -1){
    currentSlide = 'init';
    currentSlideId = 0;
    toLS('currentSlide',currentSlide);
}

const Slider = new AnimateSlider(project);

Slider.setCurrentSlide(currentSlideId);

const actions = {
    canvasUpdate () {
        let formData = serializeObj(form.find('.canvas-block input')),

            {canvas_width,canvas_height,canvas_src} = formData;
        canvas.css({
            'width' : canvas_width,
            'height' : canvas_height,
            'background-image' : canvas_src ? `url(${canvas_src})` : 'none'
        });
        project.static = formData;
        return this.updateFormStorage();
    },
    setInputs (data){
        $.each(data, (key,val) => form.find(`[name="${key}"]`).val(val));
        return this;
    },
    initProject (){
        projectWrapper.find('.project-name').html(project.static.clip_filename);
        $.each(project.slides, name => {
            slidesWrapper.append(renderSlide(name));
        });
        Slider.create('#canvas');
        return this;
    },
    initSlideController () {
        disNode(prevButton,slides[currentSlideId - 1] === undefined);
        disNode(nextButton,slides[currentSlideId + 1] === undefined);
        currentSlide === 'init' ? slideName.prop('readonly',true) : slideName.prop('readonly',false)
        return this;
    },
    slideUpdate () {
        let formData = serializeObj(form.find('.slide-block input')),
            slide = project.slides[currentSlide],
            {slide_html} = formData;
        project.slides[currentSlide] = formData;
        Slider.setFromSlideCss(slide);
        if(slide_html) $('#' + currentSlide).html(slide_html);
        return this.updateFormStorage();
    },
    slidePlay () {
        Slider.playSlide();
        return this;
    },
    addSlide () {
        let name = prompt('Enter new slide name','slide_' + slides.length);
        if(project.slides[name] !== undefined || !name) return false;
        project.slides[name] = Object.assign({},project.slides[currentSlide],{current_slide : name});
        slides.push(name);
        toLS('project',project);
        Slider.setProject(project);
        canvas.append(`<div id="${name}" class="slide"></div>`);
        return this.initSlideController();
    },
    prevSlide (){
        return this.setSlideConfig(--currentSlideId);
    },
    nextSlide (){
        return this.setSlideConfig(++currentSlideId);
    },
    setSlideConfig(id){
        currentSlide = slides[id];
        toLS('currentSlide',currentSlide);
        Slider.setCurrentSlide(id);
        Slider.setFromSlideCss(currentSlide);
        let newData = project.slides[currentSlide];
        return this.initSlideController().setInputs(newData).slideUpdate();
    },
    updateFormStorage () {
        toLS('temp',serializeObj(form));
        toLS('project',project);
        return this;
    },
    refreshClip (){
        Slider.refresh();
        $('.play-clip').prop('disabled',false);
        currentSlideId = 0;
        return this.setSlideConfig(currentSlideId);
    },
    playClip (){
        Slider.playClip();
        $('.play-clip').prop('disabled',true);
        return this;
    },
    stopClip (){
        Slider.stop();
        $('.play-clip').prop('disabled',false);
        return this;
    },
    saveClip (){
        jsonArea.val(JSON.stringify(Slider.project));
        return this;
    },
    loadProject (data){
        let obj = JSON.parse(data)
        localStorage.removeItem('currentSlide');
        toLS('temp',{...obj.static,...obj.slides.init});
        localStorage.setItem('project',data);
        location.reload();
    },
    reset() {
        if(confirm('reset project?')){
            localStorage.removeItem('currentSlide');
            localStorage.removeItem('temp');
            localStorage.removeItem('project');
            location.reload();
        }
        return this;
    }



};

if(temp !== undefined){
    actions
        .setInputs(temp)
        .canvasUpdate()
        .initProject()
        .slideUpdate();
}

actions.initSlideController();

form.submit(() => false);
buttons.click( e => {
    let key = $(e.target).attr('action');
    actions[key]();
});

Slider.on('slide_start', id => {
    currentSlideId = id;
    actions.setSlideConfig(currentSlideId);
});
// Slider.on('clip_end', () => l('clip_end'));
// Slider.on('slide_end', id => l('Slide end : ' + id));
//new_clip/img/
//==== LOAD FILE=====

let _f = {},
    _r = new FileReader();
$('#load').change(e => {
    _f = e.target.files[0];
    _r.onload = () => {
        actions.loadProject(_r.result);
    };
    _r.readAsText(_f);
});


