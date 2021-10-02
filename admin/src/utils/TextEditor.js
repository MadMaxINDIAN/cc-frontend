 import React, { useRef } from 'react';
 import {
  Container,
  TextField,
  Stack,
  Fab,
  Box,
  Card,
  Grid,
  CardHeader,
  CardContent,
  Typography,
  Button,
  colors
} from '@material-ui/core';
 import { Editor } from '@tinymce/tinymce-react';

 export default function TextEditor(props) {
   const editorRef = useRef(null);
   const handleTextChange = () => {
     if (editorRef.current) {
       props.onChange(editorRef.current.getContent());
     }
   };
   const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
   return (
     <>
      {props.error && <Stack style={{color: "red"}}>* {props.error} *</Stack>}
       <Editor
         apiKey="glkkmvfr6amtkidkd2qdb4pmrkf9wlomwmsaegunkc8az915"
         onChange={handleTextChange}
         value={props.value}
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue="<p>Edit blog content here</p>"
         init={{
           height: 500,
           menubar: 'file edit view insert format tools table help',
           plugins: [
             'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
           ],
           toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
           skin: useDarkMode ? 'oxide-dark' : 'oxide',
           content_css: useDarkMode ? 'dark' : 'default',
         }}
       />
     </>
   );
 }
