
## Available Scripts

In the project directory, you can run:

### `npm start`
to run dev mode 

### `npm run build`

to build the application 

to run the prod 
serve -s build 


to update the application 

aws s3 sync build/ s3://dounia-options --delete

Pdf protocole files are in the public/protocols folder

pdf files names must match protocol names defined in the application 