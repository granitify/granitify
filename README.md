# granitify
## developers 
- Chase
- Jackie
- Rosendo
- Samson
- Chris

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



## Message object spec
```
messageObject / resourceObject {
  // Takem directly from message
  id: INT (id of Discord message object) required, must be unique
  user: STRING (usernamne of sender of message) required
  date: INT (time in seconds elapsed since epoch) required
  text: STRING (full text of body of message), optional, defaults to empty string
  embeds: ARRAY (array of embedObjects), optional, defaults to empty array
  attachments: ARRAY (array of attachmentObjects), optional, defaults to an empty array
  
  // Determined by parsing of message
  score: INT (calculated score of resource), required, defaults to 0,
  resources: OBJECT (keyed object containing parsed out resources)
    {
     linkUrls: ARRAY (array of strings representing hyperlinks found in message), defaults to empty array
     imageUrls: ARRAY (array of strings representing image URLs found in message), defaults to empty array
     codeSnippets: ARRAY (array of strings representing code snippets found in message), defaults to empty array
    },

  // Determined by front end input
  subject: STRING (describes subject matter of resource, e.g. React or Data Structures), optional, defaults to empty string
  category: STRING (describes general category of resource, e.g. tutorial or documentation), optional, defaults to empty string
}
 ```
See `./sample-objects.json` for an importable array of sample objects based on the spec.
To use the sampleObjects in Node.js:
```
const sampleObjects = require('../sample-objects.json');
console.log(sampleObjects[0]);
```


## React Structure

```
<App // Does nothing
  < MainContainer // Contains filter/search state and functions, calls sub-components/containers
	State:
		subjects: [str...]
		categories: [str...]
		filterSubjects: [ str...]
		filterCategories: [ str...]
		currentSearch: str
	Functions
		setSubjectFilters: func
		setCategoryFilters: func
		setSearch: func
		getCategories: func
		getSubjects: func
	
	Return: 
		<SearchMenu props -> currentSearch, setSearch
	
		<FilterMenu props -> subjects, categories, filterSubjects, filterCategores, setSubjectFilters, setCategoryFilters
	
		<ResourceContainer props -> filterSubjects, filterCategories, currentSearch
			State:
				resourceList: [ {resourceObj}...]
			Functions:
				filterResources: func
				searchResources: func
		
		
			resourcesToDisplay:
				A list of <ResourceDisplay > components, each being propdrilled one of the resources
					left after filtering and searching the resourceList
			Return:
	
				resourcesToDisplay: [<ResourceDisplay>...] props-> One resource from ResourceList per ResourceDisplay


```

### Page Mockup
![Page Mockup](FrontendModelUpdated.png)
