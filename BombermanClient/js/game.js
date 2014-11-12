function checkHeroPos(newPos){
	return BM.map[newPos - 1] === 0
}

function runGameFrame(){
	
	var hero = BM.hero;
	
	if(hero.step_up)
	{
		if (checkHeroPos(hero.pos - 20))
		{
			hero.pos -= 20;
		}
	}
	else if (hero.step_down)
	{
		
		if (checkHeroPos(hero.pos + 20))
		{
			hero.pos += 20;
		}
	}
	else if (hero.step_left)
	{
		if (checkHeroPos(hero.pos - 1))
		{
			hero.pos--;
		}
	}
	else if (hero.step_right)
	{
		if (checkHeroPos(hero.pos + 1))
		{
			hero.pos++;
		}
	}
	
	hero.step_left = hero.step_right = hero.step_up = hero.step_down = false;
	
}

