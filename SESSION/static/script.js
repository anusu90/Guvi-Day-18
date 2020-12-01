// var myPromise = new Promise (function(resolve, reject){

//     myfunc = () => {console.log('hello')};

//     setTimeout(()=> {
//         resolve(myfunc);
//         console.log('bye')
//     },2000)
// })

// console.log(myPromise);


// myPromise
// .then((sucess)=> {console.log(typeof(sucess))})
// .catch((err)=> {console.log(typeof(err))})


function calculateAge(year){
    return new Promise (function(resolve, reject){
        setTimeout(()=>{
            var ageResult = new Date().getFullYear() - year;
            if (ageResult>=18){
                resolve(ageResult);
            } else {
                reject ('Age less than 18');
            }
        }, 1000)

    });
}


function checkEligibility(currentAge) {
    return new Promise (function (resolve, reject){
        if (currentAge > 18){
            resolve ('allow');
        } else {
            reject ('dont allow');
        }
    })
}

function calcSalary (eligibility){
    return new Promise (function (resolve, reject){
        if (eligibility === 'allow'){
            resolve (5000);
        } else {
            reject (4000);
        }
    })
}

function calBonus (salary) {

    return new Promise (function (resolve, reject){
        if (salary === 5000){
            bonus = 1000
            salary = salary + bonus
            resolve (6000)
        } else {
            bonus = 500
            salary = salary + bonus
            reject (salary)
        }
    })
}

calculateAge(2017)
.then (function (a){
    return checkEligibility(a);
})
.then (function(b){
    return calcSalary(b);
})
.then(function(c){
    return calBonus (c)
})
.then (function (final){
    console.log(final);
})
.catch(function(err){
    console.log(err);
})