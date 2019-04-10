/*
    All external packages used are from https://www.npmjs.com
    
    Authors: Jeet Sajan (10441729), Saumya Shastri (10442140) & Saman Arora (10434371)
*/

const CFonts = require('cfonts');
const fs = require('file-system');    //Node package used to read files (Saved Games)  Can use readLine instead!
const clear = require('clear-screen');  //Node package used to clear screen at every iteration
const rs = require('readline-sync');    //Node package used to get input from players
const fss = require('fs-extra');

let status = 0; // 0 = game is still on, 1 = game is over (won), 2 = game is a tie.
let board = [];
let i = 0;
let j = 0;
let size = 3;
let r;
let c;
let win;
let arr;
let tie;
let old = false;
let input;
let ret;
let temp;
let des;
let player = 0;
let totalplayers = 0;
let char = ['X', 'O', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];
let inputrow = "";
let inputcol = "";
let filepath="";

function save(arr)
{
    let string = JSON.stringify(arr);
    filepath = rs.question("Enter file you want to save in!");
    filepath = "saves/" +filepath+ ".txt";
    let save=  size + ";" + totalplayers + ";" + player+ ";"  + status + ";" + winc + ";"+ string;
    fs.writeFileSync(filepath, save);
}

function savewin(arr)
{
    let string = JSON.stringify(arr);
    filepath = "saves/" +filepath+ ".txt";
    let save=  size + ";" + totalplayers + ";" + player+ ";"  + status + ";" + winc + ";"+ string;
    fs.writeFileSync(filepath, save);
}

function tiecheck(arr)
{
    tie = true;
    for(i=0; i<arr.length; i++)
    {
        for(j=0; j<arr.length; j++)
        {
            if(arr[i][j] == ' ')
            {
                tie = false;
            }
        }
    }
    return tie;
}

function horcheck(arr, r, c, win)
{
    ret = false;
    j = 0;
    for(i = 0; i<(arr.length-1); i++)
    {
        if(arr[r-1][i] === arr[r-1][i+1] && arr[r-1][i] !== " ")
        {
            j++;
        }
        else
        {
            j = 0;
        }
        if(j === win-1)
        {
            ret = true;
            break;
        }
    }
    if(ret === true)
    {
        return true;
    }
    else
    {
        return false;
    }
    
}

function vertcheck(arr, r, c, win)
{
    ret = false;
    j = 0;
    for(i = 0; i<(arr.length-1); i++)
    {
        if(arr[i][c-1] === arr[i+1][c-1] && arr[i][c-1] !== " ")
        {
            j++;
        }
        else
        {
            j = 0;
        }
        if(j === win-1)
        {
            ret = true;
            break;
        }
    }
    if(ret === true)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function diagcheck(arr, winc, r, c)
{
    i=r-1;
    j=c-1;
    count = 0;
    count2=0;

    if(r == c)
    {
        i = 0;
        j = 0;
        while(true)
        {
            if(i<arr.length && j<arr.length)
            {
                if(arr[i][j] != ' ' && arr[r-1][c-1] == arr[i][j])
                {
                    count++;
                    i++;
                    j++;
                    if(count == winc)
                    {
                        break;
                    }
                }
                else if(arr[i][j] == ' ')
                {
                    count = 0;
                    i++;
                    j++;
                }
                else
                {
                    break;
                }
            }
            else
            {
                break;
            }
        }
        i=arr.length-1;
        j=arr.length-1;
        while(true)
        {
            if(i>0 && j>0)
            {
                if(arr[i][j] != ' ' && arr[r-1][c-1] == arr[i][j])
                {
                    count++;
                    i--;
                    j--;
                    if(count == winc)
                    {
                        break;
                    }
                }
                else if(arr[i][j] == ' ')
                {
                    count = 0;
                    i--;
                    j--;
                }
                else
                {
                    break;
                }
            }
            else
            {
                break;
            }
        }
    }
    else
    {
        while(true)
        {
            if(i>0 && j>0) 
            {
                i--;
                j--;
            }
            else
            {
                break;
            }
        }

        while(true)
        {
            if(i<arr.length && j<arr.length)
            {
                if(arr[i][j] == ' ')
                {
                    count = 0;
                    i++;
                    j++;
                    
                }
                else if(arr[i][j] != ' ' && arr[r-1][c-1] == arr[i][j])
                {
                    count++;
                    i++;
                    j++;
                    if(winc == count)
                        break;
                    
                }
                else
                {
                    break;
                }
            }
            else
            {
                break;
            }
        }
        i=r-1;
        j=c-1;

        while(true)
        {
            if(i<arr.length-1 && j>=0) 
            {
                i++;
                j--;
            }
            else
            {
                break;
            }
        }

        while(true)
        {
            if(i>=0 && j<arr.length)
            {
                if(arr[i][j] == ' ')
                {
                    count2 = 0;
                    i--;
                    j++;
                    
                }
                else if(arr[i][j] != ' ' && arr[r-1][c-1] == arr[i][j])
                {
                    count2++;
                    i--;
                    j++;
                    if(winc == count2)
                        break;
                    
                }
                else
                {
                    break;
                }
            }
            else
            {
                break;
            }
        }
    }
         
          

    if(count >= winc||count2>=winc)
    {
        return true;
    }
    else
    {
        return false;
    }
    

        
}

function printboard(arr)
{
    process.stdout.write("   ");
    for(i=1; i<=size; i++)
    {
        process.stdout.write("   "+i+" ");
    }
    process.stdout.write("\n");
    for(i=0; i<size; i++)
    {
        temp = i+1;
        if(temp<=9 && temp>0)
        {
            temp='00'+temp;
        }
        else if(temp>9 && temp<=99)
        {
            temp='0'+temp;
        }
        process.stdout.write((temp)+" ");
        for(j=0; j<size; j++)
        {
            if(j!=size-1)
            {
                process.stdout.write("  "+board[i][j]+" |");
            }
            else
            {
                process.stdout.write(" "+board[i][j]);
            }
        }
        process.stdout.write("\n");
        if(i!=size-1)
        {
            process.stdout.write(" ");
            for(j=0; j<size; j++)
            {
                if(j === 0)
                {
                    process.stdout.write("   ----");
                }
                else
                {
                    process.stdout.write("+----");
                }
            }
            process.stdout.write("\n");
        }
    }
}

function retrieve ()
{
    old = true;
    filepath="";
    while(true&&filepath!=="quit")
    {
        filepath = rs.question("Enter file you want to retrieve and resume: ");
        let resume = "saves/" +filepath+ ".txt";
        if(fss.pathExistsSync(resume))
        {
            file = fs.readFileSync(resume, {encoding:'utf8'});
            break;
        }
        else{
            console.log("File doesnot exist!");
            
        }
    }
    let variables = file.split(";");
    size = variables[0];
    totalplayers = variables[1];
    player = variables[2];
    status = variables[3];
    winc = variables[4];
    board = JSON.parse(variables[5]);
    status=parseInt(status);
    if(status===0)
    {           
        game();
    }
    else if(status===1)
    {
        printboard(board);
        CFonts.say('Player '+player+' Won!', {
            font: 'chrome',              
            align: 'left',              
            colors: ['red', 'cyan', 'green'],         
            background: 'transparent',  
            letterSpacing: 1,           
            lineHeight: 1,              
            space: true,                
            maxLength: '0',             
        });
    }
    else if(status===2)
    {
        printboard(board);
        CFonts.say('Game Tied!', {
            font: 'chrome',              
            align: 'left',              
            colors: ['red', 'cyan', 'green'],         
            background: 'transparent',  
            letterSpacing: 1,           
            lineHeight: 1,              
            space: true,                
            maxLength: '0',             
        });
    }
}

function game()
{
    while(true)
    {
        clear();
        printboard(board);
        console.log("It is player "+(player+1)+"'s turn!");
        input = rs.question("Enter the Row & Collumn you want to input "+char[player]+": (max "+size+" "+size+") ");
        if(input == 'q' || input == 'Q')
        {
            while(true)
            {
                des = rs.question("Do you want to save this file? ");
                if(des === "y" || des === "Y" || des === "yes" || des === "Yes")
                {   
                    
                    save(board);
                    break;
                }
                else if(des === "n" || des === "N" || des === "no" || des === "No")
                {
                    break;
                }
            }
            break;
        }
        let variables = input.split(" ");
        inputrow = variables[0];
        inputcol = variables[1]; 
        if(inputcol <= size && inputcol > 0)
        {
            inputcol = parseInt(inputcol);
            inputrow = parseInt(inputrow);
            if(inputrow > size || inputrow <= 0)
            {
                continue;
            }
            else
            {
                if(board[inputrow-1][inputcol-1] !== ' ')
                {
                    continue;
                }
                board[inputrow-1][inputcol-1] = char[player];
                if(player<(totalplayers-1))
                {
                    player++;
                }
                else
                {
                    player = 0;
                }
            }
        }
        else
        {
            continue;
        }
        if(vertcheck(board, inputrow, inputcol, winc) || horcheck(board, inputrow, inputcol, winc) || diagcheck(board, winc, inputrow, inputcol))
        {
            winarr = board;
            status = 1;
            clear();
            process.stdout.write(" ");
            for(i=1; i<=size; i++)
            {
                process.stdout.write("  "+i+" ");
            }
            process.stdout.write("\n");
            for(i=0 ; i<size; i++)
            {
                process.stdout.write((i+1)+" ");
                for(j=0; j<size; j++)
                {   
                    if(j!=size-1)
                    {
                        process.stdout.write(" "+winarr[i][j]+ " |");
                    }
                    else
                    {
                        process.stdout.write(" "+winarr[i][j]);
                    }
                }
                process.stdout.write("\n");
                if(i!=size-1)
                {
                    process.stdout.write(" ");
                    for(j=0; j<size; j++)
                    {
                        if(j === 0)
                        {
                            process.stdout.write(" ---");
                        }
                        else
                        {
                            process.stdout.write("+---");
                        }
                    }
                    process.stdout.write("\n");
                }
            }
            CFonts.say('Player '+player+' Won!', {
                font: 'chrome',              
                align: 'left',             
                colors: ['red', 'cyan', 'green'],        
                background: 'transparent', 
                letterSpacing: 1,         
                lineHeight: 1,              
                space: true,               
                maxLength: '0',            
            });
            if(old === true)
            {
                savewinn(winarr)
            }
            else
            {   
                while(true)
                { 
                    des = rs.question("Do you want to save this file? ");
                    if(des === "y" || des === "Y" || des === "yes" || des === "Yes")
                    {   
                        
                        save(board);
                        break;
                    }
                    else if(des === "n" || des === "N" || des === "no" || des === "No")
                    {
                        break;
                    }
                    else
                    {
                        continue;
                    }
                }
            }
            break;
        }
        else if(tiecheck(board) == true)
        {
            winarr = board;
            status = 2;
            clear();
            process.stdout.write(" ");
            for(i=1; i<=size; i++)
            {
                process.stdout.write("  "+i+" ");
            }
            process.stdout.write("\n");
            for(i=0 ; i<size; i++)
            {
                process.stdout.write((i+1)+" ");
                for(j=0; j<size; j++)
                {   
                    if(j!=size-1)
                    {
                        process.stdout.write(" "+winarr[i][j]+ " |");
                    }
                    else
                    {
                        process.stdout.write(" "+winarr[i][j]);
                    }
                }
                process.stdout.write("\n");
                if(i!=size-1)
                {
                    process.stdout.write(" ");
                    for(j=0; j<size; j++)
                    {
                        if(j === 0)
                        {
                            process.stdout.write(" ---");
                        }
                        else
                        {
                            process.stdout.write("+---");
                        }
                    }
                    process.stdout.write("\n");
                }
            }
            CFonts.say('Game Tied!', {
                font: 'chrome',              
                align: 'left',              
                colors: ['red', 'cyan', 'green'],         
                background: 'transparent',  
                letterSpacing: 1,           
                lineHeight: 1,              
                space: true,                
                maxLength: '0',             
            });
            if(old === true)
            {
                savewinn(winarr)
            }
            else
            {   
                while(true)
                { 
                    des = rs.question("Do you want to save this file? ");
                    if(des === "y" || des === "Y" || des === "yes" || des === "Yes")
                    {   
                        save(board);
                        break;
                    }
                    else if(des === "n" || des === "N" || des === "no" || des === "No")
                    {
                        break;
                    }
                    else
                    {
                        continue;
                    }
                }
            }
            break;
        }
    }
}
while(true)
{
    des = rs.question("Do you want to resume a saved game?")
    if(des === "y" || des === "Y" || des === "yes" || des === "Yes")
    {
        retrieve();
        break;
    }
    else if(des === "n" || des === "N" || des === "no" || des === "No")
    {
        while(true)
        {
            size = rs.question("Enter the size of the board (Not more than 999): ");
            if(size<=1 || size>999)
            {
                console.log("You entered invalid board size!");
            }
            else
            {
                break;
            }
        }
        while(true)
        {
            totalplayers = rs.question("Enter the total number of players (Not more than 26): ");
            if(totalplayers<=1 || totalplayers>26)
            {
                console.log("You entered invalid number of players!");
            }
            else
            {
                break;
            }
        }
        while(true)
        {
            winc = rs.question("Enter the winning sequence/combination: ");
            if(winc <= size)
            {
                break;
            }
            else
            {
                console.log(winc+" is not a valid winning combination!")
            }
        }
        for(i=0; i<size; i++)    //Generating the Board Array
        {
            board[i] = [];
        }
        for(i=0; i<size; i++)    //Initializing the Board Array
        {
            for(j=0; j<size; j++)
            {
                board[i][j] = ' ';
            }
        }
        game();
        break;
    }
    else
    {
        continue;
    }
}