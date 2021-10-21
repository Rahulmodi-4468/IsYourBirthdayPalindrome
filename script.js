var dob = document.querySelector("#input-date");
var showBtn  = document.querySelector("#show-btn");
var result = document.querySelector("#output");


function reverseDate(str){
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    return str === reverseDate(str);
}


function convertDateToStr(date){
    var dateStr = {day:'',month:'',year:''};
    if(date.day < 10){
        dateStr.day= "0" + date.day;
    }    
    else{
        dateStr.day = date.day.toString();
    }


    if( date.month < 10 ){
        dateStr.month ="0" + date.month;
    }else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    
    return dateStr;

}

function getAllDateFormat(date){

    var DateStr = convertDateToStr(date);

    var ddmmyyyy = DateStr.day + DateStr.month + DateStr.year;
    // var mmddyyyy = DateStr.month + DateStr.day + DateStr.year;
    // var yyyymmdd = DateStr.year  + DateStr.month + DateStr.day;
    // var ddmmyy   = DateStr.day + DateStr.month + DateStr.year.slice(-2);
    // var mmddyy   =  DateStr.month + DateStr.day + DateStr.year.slice(-2);
    // var yymmdd   =   DateStr.year.slice(-2) + DateStr.month + DateStr.day;

    return [ ddmmyyyy];
}

function CheckPalindromeForAllFormats(date){
    
    var list = getAllDateFormat(date);
    var flag = false;
    
    for(var i=0;i<list.length;++i){
        if(isPalindrome(list[i])){
            flag=true;
            break;
        }
    }

    return flag;
}

//Check year is Leap year or not
function isLeapYear(year){

    if(year % 400 === 0){
        return true;
    }

    if(year % 100 === 0){
        return false;
    }

    if( year % 4 === 0 ){
        return true;
    }
    
    return false;

}


//Give Next Date of Given date
function getNextDate(date){

    var day = date.day + 1;
    var month= date.month;
    var year = date.year;

    var monthList = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){ //check for febuary
        if( isLeapYear(year) ){ //check for leap year
            if( day > 29 ){
                day = 1;
                month++;  
            }
        }else{
            if(day > 28){
                day = 1;
                month++;
            }
        }

    }else{
        //check if the day exceeds the max days in month
        if(day > monthList[month-1]){
            day = 1;
            month++;
        }
    }

    //If Month greater than 12 we increase the year
    if(month > 12){
        month=1;
        year++;
    }


    return { day:day, month:month, year:year };

}


//get next palindrome date
function getNextPalindromeDate(date){
    var count=0;
    var nextDate = getNextDate(date);
    while (1) {
        count++;

        if(CheckPalindromeForAllFormats(nextDate)){
            break;
        }

        nextDate = getNextDate(nextDate);        

    }

    return [count , nextDate];
}




function clickHandler(){
    var BDayStr = dob.value;
    if(BDayStr !== ''){
        var listOfDate = BDayStr.split('-');
        var date = {
            day:Number(listOfDate[2]),
            month:Number(listOfDate[1]),
            year:Number(listOfDate[0])
        };

        var isPalindrome = CheckPalindromeForAllFormats(date);
        if(isPalindrome){
            result.innerText = "YaY! Your Birthday IS a Palindrome!!😎";
        }
        else{
            var [cnt , nextDate ] = getNextPalindromeDate(date);
            result.innerText=`The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year},you missed it by ${cnt} days!`;
        }
    }
}
showBtn.addEventListener('click', clickHandler);
