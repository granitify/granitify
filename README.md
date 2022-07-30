# granitify

## setup
```
git clone https://github.com/granitify/granitify.git
cd granitify
npm install
touch secrets.json
```

In the `secrets.json` file:
```
{
	"MONGO_URI": "mongodb+srv://<yourusername>:<yourpassword>@<yourdatabaseaddress>/?retryWrites=true&w=majority"
}
```

In one terminal, start the back end:
`npm start`

In another terminal, start the webpack-dev-server for the front end
`npm run dev`



```
messageObject { ID: id#, INT
                 Text: '', STRING
                 User: "author", STRING
                 Date: timestamp, DATE
                 Attachments: undefined, ???
                 Score: reactions + pinned etc., INT
                 Embed: embed, ???
                 Subject: undefined(react, mongodb etc..), STRING
                 Category: undefined(tutorial, docs, lecture) STRING
                 Resource: {URL: [''] ,  IMAGE: ''   CODE: ''}
 }
 ```

