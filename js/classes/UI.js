function UI(){
    const thisOuter =this;
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

        this.pauseMenu = document.createElement('div');
        this.pauseMenu.classList.add('pause-menu');
        
        this.playButton = document.createElement('div');
        this.playButton.classList.add('play-button');

        this.creditsButton = document.createElement('div');
        this.creditsButton.classList.add('credits-button');

    
        this.gameOver = document.createElement('div');
        this.gameOver.classList.add('ganeover-menu');
        this.gameOver.classList.add('pause-menu');
        
        this.gameOverPlayButton = document.createElement('div');
        this.gameOverPlayButton.classList.add('play-button');

        this.gameOverText = document.createElement('h1');

        this.container.appendChild(this.pause);
        this.container.appendChild(this.score);
        this.container.appendChild(this.controls);
        this.container.appendChild(this.pauseMenu);
        this.container.appendChild(this.gameOver);

        document.body.prepend(this.container);

        this.controls.appendChild(this.controlUp);
        this.controls.appendChild(this.controlRight);
        this.controls.appendChild(this.controlDown);
        this.controls.appendChild(this.controlLeft);

        this.pauseMenu.appendChild(this.playButton);
        this.pauseMenu.appendChild(this.creditsButton);

        this.gameOver.appendChild(this.gameOverText);
        this.gameOver.appendChild(this.gameOverPlayButton);

    this.updateScore = function(){
        this.score.innerHTML = getPlayerPosition()+1+coinScore;
    }
    this.scoreIncrease = function(){
        this.score.classList.add('score-increase');
        setTimeout(function(){
            thisOuter.score.classList.remove('score-increase');
        },1000);
    }
    this.viewPauseMenu = function(){
        this.pauseMenu.classList.add('show');
    }
    this.hidePauseMenu = function(){
        this.pauseMenu.classList.remove('show');
    }
    window.addEventListener('keydown',function(e){
        if(e.key === "Escape"){
            if(gameover)
                return;
            if(!pause)  pauseGame()
            else  unpauseGame()
        }
    })
    this.playButton.addEventListener('click',function(){
        unpauseGame()
    })
    this.gameOverPlayButton.addEventListener('click',function(){
        thisOuter.hideGameover()
        location.reload();
        // restartGame();
    })
    this.pause.addEventListener('click',function(){
        pauseGame()
    })
    this.showGameover = function(){
        xscore = getPlayerPosition()+1+coinScore;
        this.gameOverText.innerHTML = "Game Over<br>Your Score: "+xscore;
        this.gameOver.classList.add('show');
    }
    this.hideGameover = function(){
        this.gameOver.classList.remove('show');
    }
    this.score.innerHTML = 0;   
    
    this.clear = function(){
        this.container.parentNode.removeChild(this.container);
    }
}