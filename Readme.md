Arduino -> Google Sheet Logger

This repo is a simple way to collect data from an Arduino on a google sheet. Here are the steps to make this work: 

1) Create a new Google sheet and give it a name.

2) In the first row, add the names of the labels of the data you wish to collect as follows: 
<img width="617" alt="image" src="https://user-images.githubusercontent.com/19427655/119152971-ce6d8000-ba1e-11eb-8e8c-bf2e7c53be06.png">

3) Go to File -> Publish for web
<img width="518" alt="image" src="https://user-images.githubusercontent.com/19427655/119154016-c530e300-ba1f-11eb-931d-855fc2d18142.png">
 
4) Go to Tools -> Script Editor and it will open a separate Google App Script page. Give your project a name and optionally in the side bar, rename code.gs to a unique name.
<img width="558" alt="image" src="https://user-images.githubusercontent.com/19427655/119155057-c57dae00-ba20-11eb-84a5-d8a763e77c23.png">

5) Copy-paste the GoogleSheet_Logger.gs from the github repo. 

6) In line 2, Add the URL of your spreadsheet and save the project.

7) The functions which write the data to the Google sheet need more persmissions before it can run. Select addRow from the function drop-down and click 'Run'
<img width="506" alt="image" src="https://user-images.githubusercontent.com/19427655/119155722-771cdf00-ba21-11eb-8d47-430b025417bf.png">

8) It will ask for permission to access your data. Click 'Review permissions' and follow the steps to grant persmission. This only needs to be done once.
<img width="476" alt="image" src="https://user-images.githubusercontent.com/19427655/119155531-4b99f480-ba21-11eb-997b-990049994c3b.png">

9) Click 'Deploy' and make sure that your deployment type is 'Web app'. Be sure to tell the script to run as yourself, and allow anyone (even anonymous) to run it.
<img width="774" alt="image" src="https://user-images.githubusercontent.com/19427655/119156818-9831ff80-ba22-11eb-8a65-4d0c6759fa4e.png">

10) When you are ready, Click the blue 'Deploy' button and make a note of the app URL. That's it! Now, you can set a GET request to the web URL as follows:

If your Web App URL is: https://script.google.com/macros/s/xyz123/exec

Then your URL w/ parameters added would be: 
https://script.google.com/macros/s/xyz123/exec?key1=value1&key2=value2 

The script compares the key values with the column labels, creates a new row and adds data below. It also adds a date and time-stamp in the final column. If it can't find a key, it leaves the cell as blank. 
For example, if the google sheet has been set up as per step 2: 

https://script.google.com/macros/s/xyz123/exec?Red=415&Green=113&Blue=197&Brightness=127 adds values to all the columns.

https://script.google.com/macros/s/xyz123/exec?Red=211&Brightness=199 leaves "Blue" and "Green" as empty.

Note: Try it from your web browser and you shall see a "Success!" message. Please use 'anonymous' mode or sign out of Google before doing this because 
if you are signed in, Google inserts a '/u/1' string in your request which causes an error. 
<img width="170" alt="image" src="https://user-images.githubusercontent.com/19427655/119158193-f7dcda80-ba23-11eb-9d47-0848f582efdf.png">






