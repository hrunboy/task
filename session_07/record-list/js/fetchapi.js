//code to fetch the gitlab repo details 

//AJAX
//FetchAPI

let studentUrl = 'http://localhost:3000/students'
let subjectUrl = 'http://localhost:3000/subjects'
let scoreUrl = 'http://localhost:3000/scores'

let students = []
let subjects = []
let scores = []

//基础Api
const myfetchApi = async(url, header = {}) =>{
  return await fetch( url, header).then( response=>{
    if(response.ok){
      let result = response.json()
      return result;
    }
    return Promise.reject('error');
  });
}

//刷新信息面板
const showStudents = () =>{
  let html = '';
  students.forEach( elem =>{
    html = html +`<tr>
          <td>${elem.name}</td>
          <td>${elem.email}</td>
          <td>${elem.id}</td>
          <td><button type="button" class="btn btn-primary" onClick="updateStudentPage('${elem.id}')">Update</button></td>
          <td><i class='fa fa-trash' style='color:red;font-size:1.2em;cursor:pointer' onclick="deleteStudent('${elem.id}')"></i></td>
          </tr>;`
  })
  $('#table-body').html(html)
}


//初始化页面
const getStudents = () => myfetchApi(studentUrl, {method: 'GET'}).then( response =>{
  students = [...response];
}).then( response => myfetchApi(subjectUrl, {method: 'GET'}).then( response =>{
  subjects = [...response];
})).then( response => myfetchApi(scoreUrl, {method: 'GET'}).then( response =>{
  scores = [...response];
})).then( response =>{
  initStudentSelect();
  initSubjectSelect();
  initTableHeader();
  initData();
})

//初始化表头
const initTableHeader = () =>{
  let headerHtml = '<th scope="col">email-id</th>';
  headerHtml = headerHtml + subjects.reduce( (html, item)=>{
    html = html + `<th>${item.name}</th>`
    return html;
  },'')
  $('#header').html(headerHtml)
}

//初始化数据显示
const initData = () =>{
  let dataTable = [];
  students.map( (stu) =>{
    let info = {}
    info.name = stu.email;
    info.subject = []
    subjects.forEach(item =>{
      let result = scores.find( elem =>{
          return elem['student-id'] == stu.id && elem['subject-id'] == item.id
      })
      if(result){
        info.subject.push(1)
      } else{
        info.subject.push(0)
      }
    })

    dataTable.push(info);
  })
  showInfo(dataTable);
}

const showInfo = (infoArray) =>{
  let dataHtml = infoArray.reduce( (html, item) =>{
    html = html + '<tr>';
    html = html + `<td>${item.name}</td>`;
    html = item.subject.reduce((elemHtml,elem)=>{
      if(elem == 1){
        elemHtml = elemHtml + `<td><i class="fa fa-check"></i></td>`;
      } else{
        elemHtml = elemHtml + `<td></td>`;
      }
        
      return elemHtml;
    },html);
    html = html + '</tr>';
    return html;
  },'')
  $('#table-body').html(dataHtml);
}

//初始化学生选择
const initStudentSelect = () =>{
  let selectHtml =students.reduce( (html,item) =>{
    html = html +  `<option value="${item.id}">${item.email}</option>`
    return html;
  },'')
  $('#emailsSelect').html(selectHtml);
  $('#emailsSelect1').html(selectHtml);
}

//初始化作业选项
const initSubjectSelect = () =>{
  let selectHtml =subjects.reduce( (html,item) =>{
    html = html +  `<option value="${item.id}">${item.name}</option>`
    return html;
  },'')
  $('#subjectsSelect').html(selectHtml);
}


//增加
const addScore = (event) =>{
  let elem = {};
  elem['student-id'] = $('#emailsSelect').val();
  elem['subject-id'] = $('#subjectsSelect').val();
  elem['id'] = $('#emailsSelect').val() + '-' + $('#subjectsSelect').val()

  addScoreCall(elem);
  var event = event || window.event;
  event.preventDefault();
  return false;
}

//增加-调用后台操作
const addScoreCall = (data) => myfetchApi(scoreUrl,
  {
    method: 'POST', 
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(data)
   }).then( response =>{
   console.log('data has been add')
   showStudents();
}).catch( error =>{
 console.log(error)
})

//根据名称查询
const getStudentsByEmail = (event) =>{
  let dataTable = []
  let searchId = $('#emailsSelect1').val();

  let student = students.find( elem =>{
    console.log(elem['id'] == searchId);
    return elem['id'] == searchId
  })
  let info = {}
  info.name = student["email"];
  info.subject = []
  subjects.forEach(item =>{
    let result = scores.find( elem =>{
        return elem['student-id'] == searchId && elem['subject-id'] == item.id
    })
    if(result){
      info.subject.push(1)
    } else{
      info.subject.push(0)
    }
  })
  dataTable.push(info);
  showInfo(dataTable);
}