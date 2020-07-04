## Anuvaad - Localize your app in global languages!
An open source tool that you can use to localize your Android Apps!
It supports majority of global languages: Hindi, Spanish, Chinese, Arabic and Russian. I plan to add more as the community requires.

Can't wait to translate your app?
use it now @ [www.androidapptranslator.com](https://androidapptranslator.com)

#### You can translate your entire strings.xml file into any of these languages within few seconds.

![Demo](documentation/demo/demo.gif)


## Up an running locally

### Generating Google Cloud Translation API Key
To get ReactAnuvaad up and running locally, you'll need to create and add a Google API key to enable usage of cloud translation API.
Follow this guide to create a new Google Cloud project and creating an auth API key
https://cloud.google.com/translate/docs/basic/setup-basic

### Using the API key in ReactAnuvaad
 - Create a new file named `.env` in the project root.
 - Create a new variable containing the API key
    ```
    REACT_APP_LANG_TRANSLATION_API_KEY=<your_generated_api_key>
    ```
 - Use the created variable in [LangUtils.ts](https://github.com/swapnil1104/ReactAnuvaad/blob/master/src/components/utils/LangUtils.ts) file.

After this, ReactAnuvaad is ready to run locally using the following steps:

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
