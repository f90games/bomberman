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

    spawnHero: function(x, y){
        var x = x || 100;
        var y = y || 100;
        
        var hero = this.add.sprite(x, y, 'hero');


        return hero;
    },

    damageHero: function(){
        alert('Hero is DIE!');
    },

    placeBomb: function(){
        this.hero
    },

    create: function () {

        this.physics.startSystem(Phaser.Physics.P2JS);

        this.stage.backgroundColor = '#787878';
        this.camera.roundPx = true;

        // this.music = this.add.audio('titleMusic');
        // this.music.play();

        // this.physics.p2.setBoundsToWorld(true, true, true, true, false);

        var map = this.levelMap = this.add.tilemap('level');
        map.addTilesetImage('nitroman', 'nitromanTile');

        this.backgroundLayer = map.createLayer('background');
        this.terrianLayer = map.createLayer('terrian');
        // this.terrianLayer.debug = true;
        this.terrianLayer.resizeWorld();

        map.setCollisionBetween(31, 35, true, this.terrianLayer);
        // this.physics.p2.convertTilemap(map, this.terrianLayer);

        var bonusesCG = this.physics.p2.createCollisionGroup();
        var playersCG = this.physics.p2.createCollisionGroup();
        var wallsCG =  this.physics.p2.createCollisionGroup();
        var monstersCG = this.physics.p2.createCollisionGroup();

        this.physics.p2.updateBoundsCollisionGroup();

        var hero = this.hero = this.spawnHero();

        // var enemy = this.enemy = this.spawnHero(300, 300);

        var enemies = this.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.P2JS; 

        this.physics.p2.enable(hero, false, false);

        hero.body.setCircle(44.5);
        hero.scale.setTo(0.8, 0.8);
        hero.body.fixedRotation = true;
        hero.anchor.setTo(0.5,0.77);

        hero.body.setCollisionGroup(playersCG);
        hero.body.collides(wallsCG); 
        hero.body.collides(monstersCG, this.damageHero, this);

        for (var i = 0; i < 5; i++)
        {
            var enemy = enemies.create(this.world.randomX, this.world.randomY, 'hero');
            enemy.body.setRectangle(40, 40);
            enemy.anchor.setTo(0.5,0.77);
            enemy.body.fixedRotation = true;

            //  Tell the panda to use the pandaCollisionGroup 
            enemy.body.setCollisionGroup(monstersCG);

            //  Pandas will collide against themselves and the player
            //  If you don't set this they'll not collide with anything.
            //  The first parameter is either an array or a single collision group.
            enemy.body.collides([monstersCG, playersCG, wallsCG]);
        }

        var tileObjects = this.physics.p2.convertTilemap(map, this.terrianLayer);
        for (var i = 0; i < tileObjects.length; i++) {
            var tileBody = tileObjects[i];
            tileBody.setCollisionGroup(wallsCG);
            tileBody.collides([playersCG, monstersCG]);
        }

        this.decorationLayer = map.createLayer('decoration');
        
        var cursors = this.cursors = this.input.keyboard.createCursorKeys();

        var fireButton = this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        fireButton.onDown.add(this.placeBomb, this);

        this.camera.follow(this.hero, Phaser.Camera.FOLLOW_PLATFORMER);

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    update: function () {

        var cursors = this.cursors;

        var fireButton = this.fireButton;

        var hero = this.hero;

        
        hero.body.setZeroVelocity();

        // debugger;

        //  For example this checks if the up or down keys are pressed and moves the camera accordingly.
        if (cursors.up.isDown)
        {
            hero.body.velocity.y -= 400;
        }
        else if (cursors.down.isDown)
        {
            hero.body.velocity.y += 400;
        }

        if (cursors.left.isDown)
        {
            hero.body.velocity.x -= 400;
        }
        else if (cursors.right.isDown)
        {
            hero.body.velocity.x += 400;
        } 
        
        if (fireButton.isDown) {
            console.log('Fire!');
        }

        // this.physics.p2.collide(hero, this.enemy, function(){
        //     alert("Хыдыщь!");
        // });

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
