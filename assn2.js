
function squareNumber(num){
    // use the the math library and the power fucntion to square
    return Math.pow(num,2);
}

function fixStart(str){
    //get the first letter 
    const first = str[0];
    //start the new string with he first letter 
    let newstring= first;
    for(let i=1;i<str.length;i++){
        if(str[i]==first){
            //add star if the same as the first letter
            newstring += '*';
        }
        else{
            //otherwise just append the letter
            newstring += str[i];
        }
    }

    return newstring;
}


function notBad(str){
    const lower = str.toLowerCase()
    //find the index of not
    let not = lower.indexOf('not');
    //find the index of bad
    let bad = lower.indexOf('bad');
    //check for the cse where bad or not is not found
    // or they are in the wring order
    if(not>bad || not==-1 || bad==-1){
        //return origigal if so
        return str;
    }
    //format the output string by substringing the "not..bad "
    // "with good "
    let out =  str.substring(0,not) + "good" + str.substring(bad+3);
    return out;
}

function changeTheme(theme){
    document.getElementById("content1").className = theme;
}

document.getElementById("square").onclick = function(){
    const sq_num = document.getElementById("square_num");
    sq_num.value = squareNumber(sq_num.value);
}

document.getElementById("fix_start").onclick = function(){
    const fix_start = document.getElementById("fix_start_text");
    fix_start.value = fixStart(fix_start.value);
}

document.getElementById("not_bad").onclick = function(){
    const not_bad = document.getElementById("not_bad_text");
    not_bad.value = notBad(not_bad.value);
}

var memory = [];

document.getElementById("add_cell").onclick = function(){
    const cells =  document.getElementById("cells");
    let row = document.createElement("tr");
    let col1 = document.createElement("td");
    col1.innerText = cells.children.length;
    let col2 = document.createElement("td");
    let col3 = document.createElement("td");
    col3.innerText = 0;
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    let input = document.createElement("input");
    input.id = cells.children.length;
    input.style = "width:99.5%";
    input.oninput = function(e){
        let change_id = parseInt(e.target.id);
        const cells =  document.getElementById("cells").children;
        cells[change_id].children[2].innerText = e.target.value.length;
    };
    if(memory.length>0){
        input.value = memory.pop();
        col3.innerText = input.value.length;
    }
    col2.appendChild(input);
    cells.appendChild(row);
}

document.getElementById("sort").onclick = function(){
    const cells =  document.getElementById("cells");
    let strs = [];
    for(let i =1;i<cells.children.length;i++){
        let str = cells.children[i].children[1].children[0].value;
        if(str.length>0){
            strs.push(str);
        }
    }
    strs.sort();
    for(let i =0;i<cells.children.length;i++){
        if(i<strs.length){
            cells.children[i+1].children[1].children[0].value = strs[i];
            cells.children[i+1].children[2].innerText = strs[i].length;
        }
        else{
            cells.children[i+1].children[1].children[0].value = "";
            cells.children[i+1].children[2].innerText = 0;
        }
        
    }
}

document.getElementById("rm_cell").onclick = function(){
    const cells = document.getElementById("cells").childNodes
    if(cells.length===3){
        alert("Cannot remove any more cells!");
        return;
    }
    let last = cells[cells.length-1]
    if(last.children[1].children[0].value.length>0){
        memory.push(last.children[1].children[0].value);
    }   
    last.remove();
}

document.getElementById("add_cell").onclick();
