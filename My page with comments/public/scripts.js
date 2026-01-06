class comment
{
    constructor(name, comm, data, agree)
    {
        this.Имя= name;
        this.Комментарий = comm;
        this.Дата = data;
        this.Оценка = agree;
    }
}
var comments=[];
var flag=localStorage.getItem('flag');
if (flag==1)
{
    let node = document.querySelector('#node');
    let lifirst= document.querySelector('#node li:nth-child(5)');
    lifirst.parentNode.removeChild(lifirst);
    node.insertAdjacentHTML('beforeend', '<li><a href="cabinet.html"  title="">Кабинет</a></li>');
    node.insertAdjacentHTML('beforeend', '<li><a class="exit" onclick="hide();" title="">Выход</a></li>');
}

function buildTable(data,place) {
    
    let table = place;

    let fields = Object.keys(data[0]);
    let like=fields.pop();
    data.forEach(function(object) {
        let row = document.createElement("tr");

        fields.forEach(function(field) {
            let cell = document.createElement("td");
            cell.textContent = object[field];
            if(object[like]==false) row.style.background = '#a3ff72';else row.style.background = '#ffadad';
            row.appendChild(cell);
        });
        
        table.querySelector('tbody').appendChild(row);
    });
    if(document.querySelector('#info-table-admin'))
    {
        let trs = table.querySelectorAll('tbody tr');
        for (let tr of trs)
        {
            let td = document.createElement('td');
            td.id="forLink";
            td.className="deleteRow";
            let links2 = document.querySelector('#forLink');
            links2= document.createElement('a');
            links2.className="buttonDB";
            links2.textContent="X";
            td.appendChild(links2);
            tr.appendChild(td);
        }
    }
    return table;
  }
if(document.querySelector('#info-table'))
{
    let xhr = new XMLHttpRequest();
    xhr.open('GET','database.json');
    //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===200){
            comments=JSON.parse(xhr.responseText);
            buildTable(comments,document.querySelector('#info-table'));
        }
    }
    xhr.send();
}else if(document.querySelector('#info-table-admin'))
{
   
    let xhr = new XMLHttpRequest();
    xhr.open('GET','database.json');
    //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===200){
            comments=JSON.parse(xhr.responseText);
            buildTable(comments,document.querySelector('#info-table-admin'));
        }
    }
    xhr.send();

}
let tabledel=document.querySelector('#info-table-admin');
if(tabledel!=null)
{
    tabledel.addEventListener('click', function(evt){
        if(evt.target.closest('.deleteRow')) {
            let deleterow=evt.target.closest('tr');
            deleterow.remove();
            
            for(let comStr of comments)
            {
                
                if(deleterow.childNodes[0].textContent==comStr.Имя&&deleterow.childNodes[1].textContent==comStr.Комментарий&&deleterow.childNodes[2].textContent==comStr.Дата)
                {
                    let index = comments.indexOf(comStr);
                    comments.splice(index, 1);
                }
            }
        
            let commentsString = JSON.stringify(comments);
            var xhr = new XMLHttpRequest();
            xhr.open('POST','submit-form');//http://localhost:8000/
            xhr.setRequestHeader("Content-type","application/json");//"application/x-www-form-urlencoded"
            xhr.send(commentsString);
            
        }
    })
}


function addEl()
{
    let name = document.querySelector('#name').value;
    let comm = document.querySelector('#comm').value;
    let grade = document.querySelector('#fid-1').checked;
    
    if (comm== ""||name== ""){alert("Заполните все поля!");return;}
    var today  = new Date();
    let time=today.toLocaleString('ru-RU');
    comments.push (new comment(name, comm, time, grade));
    let commentsString = JSON.stringify(comments);
    let xhr = new XMLHttpRequest();
    xhr.open('POST','submit-form');
    xhr.setRequestHeader("Content-type","application/json");//"application/x-www-form-urlencoded"
    xhr.send(commentsString);

    document.querySelector('#comm').value="";
    document.querySelector('#name').value="";
    
    var tbodyRef = document.getElementById('info-table').getElementsByTagName('tbody')[0];

    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.textContent=name;
    tr.appendChild(td);
    td = document.createElement('td');
    td.textContent=comm;
    tr.appendChild(td);
    td = document.createElement('td');
    td.textContent=time;
    tr.appendChild(td);
    if(grade==false) tr.style.background = '#a3ff72';else tr.style.background = '#ffadad';
    tbodyRef.appendChild(tr);
}
function login()
{
    let login = document.querySelector('#login');
    let password = document.querySelector('#password');
    let authorization=login.value+password.value;
    authorization=encodeURIComponent(authorization);
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST','login');
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===200){
            if(xhr.responseText=="1")
            {
                document.location.href = "#close";
                localStorage.setItem('flag', 1);
                let node = document.querySelector('#node');
                let lifirst= document.querySelector('#node li:nth-child(5)');
                lifirst.parentNode.removeChild(lifirst);
                node.insertAdjacentHTML('beforeend', '<li><a href="cabinet.html" title="">Кабинет</a></li>');
                node.insertAdjacentHTML('beforeend', '<li><a class="exit" onclick="hide();" title="">Выход</a></li>');
                
            }else
            {
                password.value="";
                alert("Неверный логин или пароль!");
            }
        }
    }
    xhr.send('authorization='+authorization);
    
}
function hide()
{
    localStorage.setItem('flag',0);
    
    if(document.querySelector('#info-table-admin')) {
        window.location.href = 'main.html';
    }else
    {
        let node = document.querySelector('#node');
        let lifirst= document.querySelector('#node li:nth-child(6)');
        lifirst.parentNode.removeChild(lifirst);
        let lisecond= document.querySelector('#node li:nth-child(5)');
        lisecond.parentNode.removeChild(lisecond);
        node.insertAdjacentHTML('beforeend', '<li><a href="#openModal"  title="">Вход</a></li>');
    }
}
