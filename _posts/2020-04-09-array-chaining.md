---
layout: post
title: 배열 체이닝
excerpt: 함수형 스타일로 써볼 때
categories: [javascript] 
comments: true
---

```js

return data
.filter(_valueLessThan10)
.map(_toReturnFormat)
.sort(_recentDayFirst) // (a, b) => b.date - a.date
.filter(_first10items) // (_, idx) => idx < 10
.filter(_notEmpty) // d => d
.reduce(_avg, 0) // (acc, d, idx, arr) => acc += d / arr.length

```

### TIP
- 가독성의 절반 이상이 함수 이름의 형식적 통일과 표현력에서 나온다 
- 함수에 들어오는 인자가 생각보다 다양해서 유용하게 사용할 수 있다
  - filter, map, forEach : element, index, total_array
  - reduce : accr, element, index, total_array
  - sort : a, b
- forEach 는 배열을 반환하질 않아서 chaining을 멈춘다
- filter 는 함수명을 살리는게 관례
  - 예를들어 filter(empty) 라고해서 empty 를 filter-out 시키는게 아니라 empty 만 남기는것이 올바른 동작이라는 뜻이다. 

---

### chain을 억지로 이어가고 싶을때

- 결과를 그대로 리턴하는 map 을 쓸 수 있다. 
- 그냥 for 를 쓰는게 좋지 않을까 고민해보길.

```js

const _countX = d => {do(d); return d}
[].map(_countX)

```

---

### 외부 변수 활용

- 함수가 볼 수 있는곳에 외부 변수를 놓고 쓰면 가능하긴 하지만
- _countX 의 선언 위치가 제한되어 얘는 평생 거기 있을 각오를 해야한다. 

```js

let x = 0;
const _countX = d => { 
  if (d.X) x++;
  return d;
};

[].map(_countX)

```

---

### 과정 분기

- 최초의 일반적인 chanin 이후 할당이 필요할때는 한줄로 적는게 잘 보인다.
- 분기를 태울수 있다.
- 분기 각각을 다르게 후처리할 수 있다.
- 쉽게 복잡해지니 분기나 중간멈춤은 한번 정도만 쓰자.

```js

let stg_1 = data
.map(a)
.filter(b)
.sort(c);

let stg_2;
if (cond) {
  stg_2 = result.filter(d).map(e)
} else {
  stg_2 = result.filter(f).map(g)
}

return {
  table_data: stg_2.map(h).filter(i),
  graph_data: stg_2.map(j).filter(k),
};

```