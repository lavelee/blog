---
layout: post
title: 빌드과정 파악해보고 느낀 점
excerpt: CI/CD를 아주 쬐끔 맛보았는데 불맛이었다
categories: [diary] 
comments: true
---

CI/CD 얘기다. 한 저장소 안에 빌드 설정이 모여있지 않아서 더 어려운것 같다. 
config 파일, 젠킨스에 약간, 배포용 라이브러리 내부 설정에 약간, 클라우드 플랫폼에서 기본으로 실행해주는 명령 등등. 처음에는 A-B-C-D-... 순서대로 머릿속에 넣으려고 시작했는데 여기저기 쪼개진 설정과 빌드 job을 찾아다니다 손에 잘 안 잡히는 상태가 돼서 파악하기 쉽지 않았다.

### 왜 빌드를 봤냐면

회사 제품중 하나가 해외에서 너무 느려서 Static 파일 일부를 CDN 서빙할 수 있도록 빌드과정을 수정해야했기 때문이다. 
배포 내부함수들 중 먹음직스러운 네이밍이 있어 주변에 코드를 놓고 테스트부터 하려했는데 막상 해보니 그 부분을 어떻게 실행하는지는 알아야 테스트를 할거 아닌가. 찔끔 찔끔 필요한 만큼만 검색해가면서 진입점을 찾다가 놓치길 여러번. 게다가 쌔한 느낌이 드는 시나리오도 몇가지 떠올랐고 확인하려면 hoxy 문제가 생길 구조인지를 다 뜯어봐야 했다. 

가끔 잘 모르는 복잡한걸 일부만 고쳐서 해피하고싶을 때가 있는데, 문제가 생겨서 결국 처음부터 다 뜯는만큼 시간이 걸리는 상황을 몇번 경험했다. 그 뒤로는 만만하게 보고 작업하다가도 한두번 암초를 만나면 결국 다 보게될거 딱 한번만 고생하자는 마인드로 하루종일 정리만 한다. 결국 빌드 과정도 노트 열고 전체를 따라가 보았다. 

### 빌드과정 자체는 특별한게 없었지만

의외로 코드 외적인 부분이 빌드를 어렵게 느끼게 하는 요인이었다. 

- 코드로 정의하지 않아도 작동하는 동작을 활용한 경우 
  - github hook이 발생하면 자동으로 postback 해주는 플러그인이 있고, 그 postback 시그널을 다음 작업의 trigger로 사용
  - AWS의 ElasticBeanstalk 는 배포 후 자동으로 package.json 의 start 커맨드를 실행
  - 모르면 백만년동안 삽질
- 검색할 방법이 없는 장소에 조건을 설정한 경우
  - 젠킨스 빌드 job 의 설정에서 빌드 flag를 삽입해서 실행
  - 검색만 안될뿐 심증은 있기 때문에 시간만 쏟으면 찾을 수 있음
- (거의) 똑같은 이름 사용
  - docker image 빌드 job 이름 build, 빌드한 이미지 이름 build, 쉘 스크립트 이름 build, 번들링 job 이름 build, 번들링 임시 파일 이름 build...
  - 검색해서 따라가다가 잘못 타면 처음부터 다시 ^^