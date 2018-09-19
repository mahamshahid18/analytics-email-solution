# Analytics Email Solution 📊📨👩‍💻

I designed and implemented this project from scratch while working as the Product Marketing Lead @[APIMatic](https://apimatic.io). In the following paragraphs, I'll talk about why this project was needed, how it was implemented, and some hurdles that had to be overcome.

## The need for usage insights emails
These days, there is an increasing trend of companies sending out emails to their userbase to give them insights about their usage patterns related to the company's products. More and more companies are coming up with this model to keep users engaged and market further products.

For us, implementing this had the following purposes:
* We aimed to boost our marketing efforts by sending users weekly emails about their usage patterns.
* It was decided for the emails to have certain 'call-to-action's to introduce our other products to already active users
* This was also an attempt to establish communication with our users, ask them about their experience, help them if they were stuck with something, and gather important feedback
* This would eventually help us identify and keep track of some leads

## How I implemented the solution
As easy as it sounded, the project was actually pretty complex. Therefore, I took ample time for planning everything first before diving into the implementation details. I approached this problem by first, writing down a set of rough requirements that were needed. I wasn't given any specific instructions, just that this had to be implemented. So, I took some time to study how data was already being stored, and then figuring out how I could query that data about certain users. Another important detail was to figure out what data to filter out, and for which users exactly.

After documenting all findings about this, I moved on to the technical details.

### The technical details 👩‍💻
This project has 2 main parts:
* An express server, which exposes a webhook for capturing data sent by Mixpanel (email id's of the users that were qualified by the criteria I set).
* A Node.js program which takes all the emails received, runs queries on them (through Mixpanel API) to get usage specific data, and sends emails to all qualified users about their usage insights

The implementation specific logic has been divided into related, manageable 'modules'.
* There is a helper file which contains global helper functions in the [`utilities`](https://github.com/mahamshahid18/analytics-email-solution/tree/master/utilities) folder
* The `data` folder contains a [`webhook-data-parser`](https://github.com/mahamshahid18/analytics-email-solution/blob/master/data/webhook-data-parser.mjs) file which receives emails of qualified users from Mixpanel, creates a structure for each user, populates the email for each and then stores this structure (with emails populated) in a JSON file. It also has a [`user-data`](https://github.com/mahamshahid18/analytics-email-solution/blob/master/data/user-data.mjs) file which exposes the structure of data for each user, as well as some related helper functions
* In the `queries` folder, there is a [`queries-templates`](https://github.com/mahamshahid18/analytics-email-solution/blob/master/queries/queries-templates.mjs) file which contains the templates of queries (written in JQL) for obtaining usage data from Mixpanel. It also contains a [`query-processor`](https://github.com/mahamshahid18/analytics-email-solution/blob/master/queries/query-processor.mjs) file which calls these queries with the correct data and sends an HTTP request to get the required data, and then parses and store all the data about a user (populates the structure that was stored in the JSON file with actual usage stats)
* The `emails` folder contains an [`email-content.json`](https://github.com/mahamshahid18/analytics-email-solution/blob/master/emails/email-content.json) file which holds some of the generic content for the email body. There is also an [`email-generator`](https://github.com/mahamshahid18/analytics-email-solution/blob/master/emails/email-generator.mjs) file which generates the whole body of the email in parts
* The [`index.mjs`](https://github.com/mahamshahid18/analytics-email-solution/blob/master/index.mjs) file basically executes its functionality according to a scheduled time. Whenever the scheduled time arrives, this file would first call the `QueryProcessor` class to fetch usage stats of all the users whose emails have been populated in the JSON file. When the data has been completely populated in the JSON file, this file then calls `EmailGenerator` class to generate the HTML for the emails, sends out these emails and then creates a log file for future storage purposes

Here's a screenshot of the generated email content:

![analytics-email-email-screenshot](https://user-images.githubusercontent.com/12479952/45786727-404c0500-bc8b-11e8-8816-9251cd3f72bc.PNG)


## The challenges
One major challenge that I came across was the **meticulate planning required** to get all the different parts to work together. Another major concern was **learning JQL**. There wasn't a lot of help material available so some starter code from a colleague, and trial-and-error eventually helped me figure it out. **Testing** the different parts of the application was also a tedious task.

Please let me know if you have any questions about this or if you want to discuss anything related to my projects 😄
