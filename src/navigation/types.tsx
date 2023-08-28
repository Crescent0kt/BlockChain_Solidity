export type StackNavigatorParamList = {
  Login: undefined;
  Main: undefined;
  AddCareer: undefined;
  Agreement: undefined;
  ShowAgreement: {
    employee: string;
    employer: string;

    start_year: number,
    start_month: number,
    start_day: number,

    end_year: number,
    end_month: number,
    end_day: number,

    location: string;
    job: string;

    start_time: number;
    end_time: number;

    start_restTime: number;
    end_restTime: number;

    work_day: number;
    holiday: string;

    salary: number; //추가된 부분 -> 1(월급) 2(일급) 3(시급)
    payment: number;

    hasBonus: boolean; //수정된 부분 -> 상여금 유무
    bonus: number; //상여금

    hasOther: boolean; //수정된 부분 -> 기타급여 유무
    other_salary: string;

    payCheck: number;//추가된 부분 1 매월 , 2 매주, 3 매일
    pay_day: string;

    account: boolean;

    insurance1: boolean;
    insurance2: boolean;
    insurance3: boolean;
    insurance4: boolean;

    create_time: string;

    
  };
  Agreement2: {
    employee: string;
    employer: string;

    start_year: number,
    start_month: number,
    start_day: number,

    end_year: number,
    end_month: number,
    end_day: number,

    location: string;
    job: string;

    start_time: number;
    end_time: number;

    start_restTime: number;
    end_restTime: number;
  };
  Agreement3: {
    employee: string;
    employer: string;

    start_year: number,
    start_month: number,
    start_day: number,

    end_year: number,
    end_month: number,
    end_day: number,

    location: string;
    job: string;

    start_time: number;
    end_time: number;

    start_restTime: number;
    end_restTime: number;

    work_day: number;
    holiday: string;

    salary: number;
    payment: number;

    hasBonus: boolean;
    bonus: number;

    hasOther: boolean;
    other_salary: string;

    payCheck: number;//매월 , 매주, 매일
    pay_day: string;

    account: boolean;

  };
  ShowCareer: undefined;
};
