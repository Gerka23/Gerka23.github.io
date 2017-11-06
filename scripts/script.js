function finish(){
	(document.getElementById("first stage")).style="display: none;";
	(document.getElementById("second stage")).style="display: none;";;
	(document.getElementById("third stage")).style="display: block;";;
}

function return_from_last_page(){
	(document.getElementById("first stage")).style="display: none;";
	(document.getElementById("second stage")).style="display: block;";;
	(document.getElementById("third stage")).style="display: none;";;
}

function reset_function(){
	(document.getElementById("first stage")).style="display: block;";
	(document.getElementById("second stage")).style="display: none;";;
	(document.getElementById("third stage")).style="display: none;";;
}

function initialize(){
var table = document.getElementById("maintable");
var sortbtn = document.getElementById("quicksort");
var rpntbtn = document.getElementById("repaint");
var sbsbtn = document.getElementById("gosbs");
var nextbtn = document.getElementById("Next");
var prevbtn = document.getElementById("Previous");
var Ninput = document.getElementById("Ninput");
var firststage=document.getElementById("first stage");
var secondstage=document.getElementById("second stage");
var N=Ninput.value;
var maxHeight=100;
var arraytosort=[];
var initialarray;
var cols = [];
var stripes=[];
var sortsteps=[];
var currentStep = 0;
var temp;

if (N<10 || N>30 || N == ""){
	N=10;
}
N=parseInt(N,10);
firststage.style="display: none;";
secondstage.style="display: block;";

for (i = 0; i < N; i++) { 
	arraytosort.push(Math.floor(Math.random()*(maxHeight)));
}
initialarray=arraytosort.slice();

temp=table.childNodes.length;
for (i=0; i < temp;i++){
	table.removeChild(table.childNodes[0]);
}

for (i = 0; i < N; i++) { 
	cols.push(document.createElement("td"));
	stripes.push(document.createElement("img"));
	stripes[i].setAttribute("src","images/redstrip.png");
	table.appendChild(cols[i]);
	cols[i].appendChild(stripes[i]);
	stripes[i].width=20;
	stripes[i].height=arraytosort[i];
}

sortbtn.type="button";
sortbtn.name="Sort_quickly";
sortbtn.value="Sort without steps";
sortbtn.onclick=function() {
	arraytosort=initialarray.slice();
	quickSort(arraytosort,stripes);
	for (i = 0; i < N; i++) { 
		stripes[i].src="images/redstrip.png";
	}
	nextbtn.style.visibility="hidden";
	prevbtn.style.visibility="hidden";
}

rpntbtn.type = "button";
rpntbtn.name="Repaint";
rpntbtn.value="Repaint";
rpntbtn.onclick=function() {
	console.log(stripes);
	for (i = 0; i < N; i++) { 
		stripes[i].height=initialarray[i];
		stripes[i].src="images/redstrip.png";
	}
	nextbtn.style.visibility="hidden";
	prevbtn.style.visibility="hidden";
}
sbsbtn.type="button";
sbsbtn.name="Sort_slowly";
sbsbtn.value="Sort step by step";
sbsbtn.onclick=function() {
	sortsteps=[[]];
	arraytosort=initialarray.slice();
	quickSort_rs(arraytosort,stripes,sortsteps);
		for (i = 0; i < N; i++) { 
		stripes[i].height=initialarray[i];
	}
	nextbtn.style.visibility="visible";
	prevbtn.style.visibility="visible";
	currentStep = 0;
	sortsteps[0]=initialarray.slice();
	
}

nextbtn.type="button";
nextbtn.name="next";
nextbtn.value=">>";
nextbtn.style.visibility="hidden";
nextbtn.onclick=function() {
	if (currentStep<0){
		currentStep=0;
	}
	currentStep+=1;

	
	if (currentStep < (sortsteps.length) ) {
		
		if (currentStep>1) {
			stripes[sortsteps[currentStep-1][N]].src="images/redstrip.png"
			stripes[sortsteps[currentStep-1][N+1]].src="images/redstrip.png"
			stripes[sortsteps[currentStep-1][N+2]].src="images/redstrip.png"
		}
		
		
		stripes[sortsteps[currentStep][N]].src="images/blackstrip.png"
		stripes[sortsteps[currentStep][N+1]].src="images/blackstrip.png"
		stripes[sortsteps[currentStep][N+2]].src="images/yellowstrip.png"
		
		for (i = 0; i < N; i++) { 
			stripes[i].height=sortsteps[currentStep][i];
			
		}
	} else {
		currentstep = sortsteps.length;
		for (i = 0; i < N; i++) { 
			stripes[i].height=arraytosort[i];
			stripes[i].src="images/redstrip.png";
		}
	}
}

prevbtn.type="button";
prevbtn.name="next";
prevbtn.value="<<";
prevbtn.style.visibility="hidden";

prevbtn.onclick=function() {
	if (currentStep>=sortsteps.length){
		currentStep=sortsteps.length;
	}
	currentStep-=1;

	
	if (currentStep > 0 ) {
		
		if (currentStep < sortsteps.length-1) {
			stripes[sortsteps[currentStep+1][N]].src="images/redstrip.png"
			stripes[sortsteps[currentStep+1][N+1]].src="images/redstrip.png"
			stripes[sortsteps[currentStep+1][N+2]].src="images/redstrip.png"
		}
		
		stripes[sortsteps[currentStep][N]].src="images/blackstrip.png"
		stripes[sortsteps[currentStep][N+1]].src="images/blackstrip.png"
		stripes[sortsteps[currentStep][N+2]].src="images/yellowstrip.png"
		
		for (i = 0; i < N; i++) { 
			stripes[i].height=sortsteps[currentStep][i];
		}
	} else {
		
		currentstep = 0;
		for (i = 0; i < N; i++) { 
			stripes[i].height=initialarray[i];
			stripes[i].src="images/redstrip.png";
		}
	}
}

}

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}
 

function partition(items, attr, left, right) {

    var pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;


    while (i <= j) {

        while (items[i] < pivot) {
            i++;
        }

        while (items[j] > pivot) {
            j--;
        }

        if (i <= j) {
            swap(items, i, j);
			attr[i].setAttribute("height",items[i]);
			attr[j].setAttribute("height",items[j]);
			i++;
            j--;
        }
    }

    return i;
}

function quickSort(items, attr, left, right) {

    var index;

    if (items.length > 1) {

        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items,attr, left, right);
		
        if (left < index - 1) {
            quickSort(items, attr, left, index - 1);
        }

        if (index < right) {
            quickSort(items, attr, index, right);
        }
    }

    return items;
}

function quickSort_rs(items, attr, mem, left, right) {

    var index;
	var temp=items.slice();
	mem.push(temp);
	
    if (items.length > 1) {

        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items,attr, left, right);
		mem[mem.length-1].push(left);
		mem[mem.length-1].push(right);
		mem[mem.length-1].push(Math.floor((right + left) / 2));
        if (left < index - 1) {
            quickSort_rs(items, attr, mem, left, index - 1);
        }

        if (index < right) {
            quickSort_rs(items, attr, mem, index, right);
        }

    }

    return items;
}

function repaint(stripes,items){
	for (i = 0; i < N; i++) { 
		stripes[i].height=items[i];
	}
}
