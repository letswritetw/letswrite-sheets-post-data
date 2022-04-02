const Demo = new Vue({
  el: '#app',
  data: {
    nickname: '',
    toy: '',
    user: '',
    subscribe: '',

    sending: false,

    apiUri: 'https://script.google.com/macros/s/AKfycbymoR5zRT3JIMAngRx5j5oBPS0WnPXsdegtxhzFrhn0yNNZk9icsQssKCGPZtNLQBcV/exec'
  },
  methods: {
    sendData() {
      this.sending = true;

      const d = new Date(),
            y = d.getFullYear(),
            mon = d.getMonth() + 1,
            day = d.getDay(),
            h = d.getHours(),
            m = d.getMinutes(),
            s = d.getSeconds();
      const today = `${y}-${mon}-${day} ${h}:${m}:${s}`;
      
      let formdata = new FormData();
      formdata.append('today', today);
      formdata.append('nickname', this.nickname);
      formdata.append('toy', this.toy);
      formdata.append('user', this.user);
      formdata.append('subscribe', this.subscribe);

      const config = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch(this.apiUri, config)
        .then(response => response.text())
        .then(result => {
          if(result === 'success') {
            this.sending = false;
            alert('資料已成功送出，我們下次見~');
            this.nickname = this.toy = this.user = this.subscribe = '';
          }
        })
        .catch(error => console.log('error', error));

    },
    submit() {
      if(this.nickname.length <= 0) alert('請填寫江湖稱號');
      else if(this.toy.length <= 0) alert('請填寫你的玩具');
      else if(this.user.length <= 0) alert('請選擇你來過的次數');
      else if(this.subscribe.length <= 0) alert('請選擇你是否會訂閱');
      else this.sendData();
    }
  },
})