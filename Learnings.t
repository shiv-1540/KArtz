
1. AuthProvider
  => provides authentication & authorization to modern websites
  => an object that contains methods for handling authentication and authorization in an app. 

2. Link,UseNavigate are part 'react-router-dom'

3. Tailwind CSS Integration 
   
       Step1: install tailwind css
          npm install -D tailwindcss postcss autoprefixer
          npx tailwindcss init

       step2: tailwind.config.js
          module.exports = {
            content: [
              "./src//*.{js,jsx,ts,tsx}", // Add all paths that use Tailwind classes
            ],
            theme: {
              extend: {},
            },
            plugins: [],
          }

        step3 =>Create a src/tailwind.css
          @tailwind base;
          @tailwind components;
          @tailwind utilities;

        step4 => src/index.js
          import './tailwind.css';
  
4. Github Handling

     Steps to Push Updates to GitHub
       step1: Stage the Changes
              Stage all modified, deleted, and untracked files
               git Add -A

       step2: Verify the Changes
              Check the staged changes to ensure everything is correct
              git status

       step3: git commit -m "Updated project files, removed unnecessary files, and added new assets"
       step4: Push Your Changes to GitHub
              git push origin main

    ## if Pull from Github
       step5: Pull the Latest Changes from GitHub
              To ensure your local branch is up to date with the remote main branch

5. NodeMailer Mail sending
      step1:  
        Install nodemailer 
        npm install nodemailer 

      step2:
        
6. Admin Verification 
================================================================================
7. Tailwind Color Palleate 
    this website ->  https://tailwindcolor.com/
      
================================================================================
8. Github repo summary
     github.com/KArtz -> gitingest.com/KArtz

================================================================================
9. Styling 
      Flexing
        justify-content: center start end evenly between 
        align-items: start end center 
        align-content: start end center
        align-self:start end center
      
      Website Links 
         https://phosphoricons.com/ -> customized icons

===============================================================================
10. AI chatBot/Virtual Assistant

    API Key =>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

   => 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
    ## Nodejs
    npm install openai

    import OpenAI from "openai";

      const openai = new OpenAI({
        apiKey: "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",
      });

      const completion = openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          {"role": "user", "content": "write a haiku about ai"},
        ],
      });

      completion.then((result) => console.log(result.choices[0].message));


      ##Python
      pip install openai

      from openai import OpenAI

        client = OpenAI(
          api_key="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"
        )

        completion = client.chat.completions.create(
          model="gpt-4o-mini",
          store=True,
          messages=[
            {"role": "user", "content": "write a haiku about ai"}
          ]
        )

        print(completion.choices[0].message);

====================================================================================
11.Real Time Tracking of Ordered Items 
    -- Intgrate with tracking platforms => AfterShip, ShipStation, and Tracktor
    -- https://www.aftership.com/docs/tracking/model/tracking


12. Sentiment Analysis 
    --identifies the emotional tone behind a body of text.[By NLP]

