import messages from '../../locales/en.json'
export const localizationMixin = {
  data() {
    return {
      messages: messages,
      currentLocale: 'en', // Default locale
    };
  },
  computed: {
    $t() {
      return (key) => {
       var fileData = this.messages;
       
        var message = key.split('.');
        for(var i=0;i<message.length;i++){
         //   console.log(message[i],"iiiiii")
            var jsonData = message[i];
            fileData = fileData[jsonData];
        }
        message = fileData;
        return message || key;
      };
    },
  },
};
