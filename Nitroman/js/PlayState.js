var App = App || {};

App.PlayState = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.music = null;
    this.levelMap = null;

    this.hero = null;

};

App.PlayState.prototype = {

    spawnHero: function(){
        return this.add.sprite(0, 0, 'hero');
    },

    create: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.stage.backgroundColor = '#787878';
        this.camera.roundPx = true;

        // this.music = this.add.audio('titleMusic');
        // this.music.play();

        var map = this.levelMap = this.add.tilemap('level');
        map.addTilesetImage('nitroman', 'nitromanTile');

        map.setCollisionBetween(31, 35);

        this.backgroundLayer = map.createLayer('background');

        this.terrianLayer = map.createLayer('terrian');

        this.hero = this.spawnHero();
        this.physics.enable(this.hero);

        this.hero.body.collideWorldBounds = true;

        this.decorationLayer = map.createLayer('decoration');

        //  Un-comment this on to see the collision tiles
        // layer.debug = true;

        this.decorationLayer.resizeWorld();        

        var cursors = this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.enable(this.hero);

        this.camera.follow(this.hero);

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    update: function () {

        var cursors = this.cursors;

        var hero = this.hero;

        this.physics.arcade.collide(hero, this.terrianLayer);

        //  For example this checks if the up or down keys are pressed and moves the camera accordingly.
        if (cursors.up.isDown)
        {
            hero.body.y -= 5;
        }
        else if (cursors.down.isDown)
        {
            hero.body.y += 5;
        }

        if (cursors.left.isDown)
        {
            hero.body.x -= 5;
        }
        else if (cursors.right.isDown)
        {
            hero.body.x += 5;
        }


        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    pause: function(){

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        // this.music.stop();

        //  Then let's go back to the main menu.
        this.state.start('MainMenuState');

    }

};
