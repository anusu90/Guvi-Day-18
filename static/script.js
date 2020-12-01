let url = 'https://restcountries.eu/rest/v2/all';

getData = (url) => {
    return new Promise ((resolve, reject)=> {
        xhr = new XMLHttpRequest ();
        xhr.open('GET',url);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status <= 299){
                resolve(JSON.parse(xhr.response));
            } else {
                reject (xhr.status);
            }
        }
    })
}

let state = {
    'page': 1,
}


trimData = (data, page) => {
    start = (page - 1) * 6;
    end = start + 6
    trimmedData = data.slice(start,end)
    return trimmedData
}


displayData = (data, page)  => {

    return new Promise((resolve,reject)=> {
        console.log(data);
        displayNodes = document.querySelectorAll('.display-col')
        trimmedData = trimData(data,page);
        displayNodes.forEach((node,index) => {
            node.innerHTML =  `<p> ${trimmedData[index].name} </p>` +
                              `<img src="${trimmedData[index].flag}" style = "width:100%; height:41.856% ;margin-bottom:10px">` +
                              `<p class = 'capital'>Capital:<button class='btn btn-success'>${trimmedData[index].capital}</button> </p> ` +
                              `<p class = 'capital'>Country Code: ${trimmedData[index].alpha2Code}, ${trimmedData[index].alpha3Code} </p>` +
                              `<p class = 'capital' >Region: ${trimmedData[index].region}</p>` +
                              `<p class = 'capital' >Lat, Long: ${trimmedData[index].latlng[0]},${trimmedData[index].latlng[1]} </p>`
        })
    
    
        document.getElementById('btns').innerHTML = ''
        document.getElementById('btns').innerHTML = '<button class="btn btn-primary page-btn" value=0>First</button>'
        for (var i = state.page; i < state.page + 10 && i<=42; i++){
            tempBtn = document.createElement('button');
            tempBtn.classList.add('btn', 'btn-primary', 'page-btn');
            tempBtn.setAttribute('value',i)
            tempBtn.innerHTML = i;
            document.getElementById('btns').append(tempBtn);        // document.getElementById('btns').append(`<button class="btn btn-primary">${i}{</button>`);
        }

        console.log('jj');

        listBtns = document.querySelectorAll('.page-btn').forEach((b) =>{
            b.addEventListener('click', (event)=> {
                console.log(event.target.value);
                event.target.value !=0? state.page = parseInt(event.target.value): state.page = 1;
                console.log(state)
                displayData(JSON.parse(sessionStorage.getItem('myData')), state['page']);
            })
        })

        resolve("success");
    }) 
}


getData(url)
.then((response) => {
    sessionStorage.setItem('myData', JSON.stringify(response))
    return displayData(JSON.parse(sessionStorage.getItem('myData')), state['page']);
})
.then(m=> console.log(m))
.catch(err => console.log(err));




