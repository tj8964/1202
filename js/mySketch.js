const COLS = createCols("https://coolors.co/b8b8d1-5b5f97-ffc145-00b884-ff6b6c-ff3c38-000f24");
const CYCLE = 450;
const NUM = 40;

function setup() {
	// let s = min(windowWidth, windowHeight) * 0.8;
	// createCanvas(s, s, WEBGL);
	let s = min(windowWidth, windowHeight) * 0.8;
	var canvas = createCanvas(s, s, WEBGL);;
  canvas.parent('abc');

	//ortho
	let dep = max(width,height);
	ortho(-width / 2, width / 2, -height / 2, height / 2,-dep*3 , dep*3);

}

function draw() {
	
	const frameSpan = CYCLE / NUM;
	const unitMaxSize = width * 0.3;
	
	
	let radius = 0.5 * (width - unitMaxSize * 1.2);
	
	background(250);
	
	noStroke();
	push();
	rotateX(-PI/4);
	rotateY(-PI/4);

	for(let i = 0; i < NUM; i++){
		let angle = getRaioEased(frameCount + i * frameSpan) * TAU;
		let r = unitMaxSize * (0.6 + 0.4 * sin(i / NUM * TAU));
		
		let x = radius * cos(angle);
		let y = 0;
		let z = radius * sin(angle);
		
		ellipseMode(CENTER);
		fill(COLS[i % COLS.length]);
		push();
		translate(x, y, z);
		rotateY(- angle);
		ellipse(0, 0, r, r, 45);
		pop();
	}
	pop();
}


function getRatio(count)
{
	let frameRatio  = (count % CYCLE) / CYCLE;
	
	return frameRatio;
}

function getRaioEased(count)
{
	let ratio = getRatio(count);
	let easeRatio = easingEaseInOutQuint(ratio)  * 0.9 + ratio * 0.1 ;
	
	return easeRatio;
}


function easingEaseInOutCubic (x)
{
	if(x < 0.5)return 0.5 * pow(2*x, 3);
	else return 0.5 * pow(2*(x-1), 3) + 1;
}

function easingEaseInOutQuint(x)
{
  if (x < 0.5) {
    return 0.5 * pow(2 * x, 5);
  } else {
    return 0.5* pow(2 * (x - 1), 5) + 1;
  }
}

function createCols(_url)
{
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}
