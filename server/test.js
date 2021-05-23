function followingDay(day) {
    // TODO: 여기에 코드를 작성합니다.

    let result;
    if(typeof(day) === 'string' && day.includes('요일')) {
        if(day.includes('월')) {
            result = '화요일';
        } else if(day.includes('화')) {
            result ='수요일';
        } else if(day.includes('수')) {
            result = '목요일';
        } else if(day.includes('목')) {
            result = '금요일';
        } else if(day.includes('금')) {
            result = '토요일';
        } else if(day.includes('토')) {
            result = '일요일';
        } else {
            result = '월요일';
        }
    } else {
      result = '올바른 요일이 아닙니다';
    }

    return result;
}

console.log(followingDay('일요일'));