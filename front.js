document.getElementById('checkIDButton').addEventListener('click', async () => {
  const name = document.getElementById('nameInput').value;
  if (!name) return;

  try {
    const response = await fetch(`http://localhost:3000/membership/create/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
    
    if (response.ok) {
      const data = await response.json();
      document.getElementById('membershipResult').textContent = `name: ${data.name}
      did : ${data.didURL}`;
    } else {
      document.getElementById('membershipResult').textContent = 'Invalid transaction hash or not found';
    }
  } catch (error) {
    console.error(error);
  }
});


document.getElementById('checkKeyButton').addEventListener('click', async () => {
  const name = document.getElementById('keyInput').value;
  if (!name) return;

  try {
    const response = await fetch(`http://localhost:3000/membership/search/${key}`);
  
  } catch (error) {
    console.error(error);
  }
});


document.getElementById('contractButton').addEventListener('click', async () => {

  let contract = {
    employer : 'Kim',
    employee : 'Lee',

    // 근무로로 계약 기간 시작일 
    start_year : 2022,
    start_month : 10,
    start_day : 10,

    // 근로 계약 기간 종료일 
    end_year : 2023,
    end_month : 10,
    end_day : 10, 

    location : '편의점', // 근무 장소
    job : '편돌이', // 업무의 내용 

    // 소정근로시간  
    start_time : 1030, 
    end_time : 2030, 

    //휴게시간
    start_restTime : 1130,
    end_restTime : 1300,

    work_day : 5, //근무일 주 n회 
    holiday : '수', //주휴일 매주 n요일 
    payment : '3000000', // 월급 
    bonus : '500000', // 상여급 
    other_salary : '77777', // 기타급여 
    pay_month : 15, // 임금지급일 월 기준 
    pay_week : null, // 임금지급일 주 기준 
    account : true, // 임금 지급 방법 

    // 사회보험 적용 여부 
    insurance1 : true, // 고용보험 
    insurance2 : false, // 산재보험 
    insurance3 : false, // 국민연금 
    insurance4 : true, // 건강보험 

    // 작성 기준 날짜 
    create_time : new Date()
  };

  try {
    const response = await fetch('http://localhost:3000/contract/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contract),
    })
    .then(response => response.json())
    .then(data => document.getElementById('contractResult').textContent =  JSON.stringify(contract))
    .catch((error) => console.error('Error:', error));
    
    // if (response.ok) {
    //   const data = await response.json();
    //   document.getElementById('contractResult').textContent = data;
    // } else {
    //   document.getElementById('contractResult').textContent = 'Invalid transaction hash or not found';
    // }
  } catch (error) {
    console.error(error);
  }
});