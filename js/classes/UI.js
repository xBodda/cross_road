function UI(){
    //CreateElements
        this.container = document.createElement('div');
        this.container.setAttribute('id','user-interface');
        this.pause = document.createElement('div');
        this.pause.classList.add('pause');
        this.score = document.createElement('div');
        this.score.classList.add('score');
        this.controls = document.createElement('div');
        this.controls.classList.add('controls');
        this.controlUp = document.createElement('div');
        this.controlUp.classList.add('up')
        this.controlLeft = document.createElement('div');
        this.controlLeft.classList.add('left')
        this.controlRight = document.createElement('div');
        this.controlRight.classList.add('right')
        this.controlDown = document.createElement('div');
        this.controlDown.classList.add('down')
        this.container.appendChild(this.pause);
        this.container.appendChild(this.score);
        this.container.appendChild(this.controls);
        document.body.prepend(this.container);
        this.controls.appendChild(this.controlUp);
        this.controls.appendChild(this.controlRight);
        this.controls.appendChild(this.controlDown);
        this.controls.appendChild(this.controlLeft);
    
    this.updateScore = function(){
        this.score.innerHTML = getPlayerPosition()+1;
    }

    window.addEventListener('keydown',function(e){
        if(e.key === "Escape"){
            pause = !pause;
        }
    })
    this.score.innerHTML = 0;        
}