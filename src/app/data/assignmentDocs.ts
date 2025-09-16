// src/app/data/assignmentDocs.ts

export interface Assignment {
  title: string;
  url: string; // URL for the assignment document (e.g., DOCX)
}

export const assignments: { [courseId: string]: Assignment[] } = {
  'Data-Science': [
    {
      title: 'Crisp MLQ)',
      url: "https://drive.google.com/uc?export=download&id=17rcLQ2roOeywbXdIyPDLLoMiqvuftR9L",
    },
    {
      title: 'Inferential.zip',
      url: "https://drive.google.com/uc?export=download&id=1KMFGhopJNN_XLgPgy69rdHqacW99Pjk1",
    },
  
  ],
  'SQL': [
    {
      title: 'SQL Assignment',
      url: 'https://docs.google.com/document/d/1Yg9Bz2sXWsvTt9KOelMWUJ4qYsOAysnz/export?format=docx',
    },
  ],

    'Power-BI': [
    {
      title: 'Power-Bi.docx',
      url: 'https://drive.google.com/uc?export=download&id=1YoD8NOFev5isJf6TEPNwgRyG0Db0DQ06',
    },
    {
      title: 'Sales_data.xlsx',
      url: 'https://docs.google.com/spreadsheets/d/1S5gyaA4Z49BYrhhia0ZdHChgFXbJsMMI/export?format=xlsx',
    },

  ],
  'Data-Engineering':[
    {
        title: 'Apache Kafka.docx',
        url: 'https://docs.google.com/document/d/1OuXb2UDnSe-9DLi3R1NR6KbbF6lvVXsw/export?format=docx',
    },
      {
        title: 'Apache-Nifi-Airflow.docx',
        url: 'https://docs.google.com/document/d/11FBWm8ymgKT7M9jUHcyJg6AnFngs1vQU/export?format=docx',
    },
      {
        title: 'sales.csv',
        url:'https://drive.google.com/uc?export=download&id=1fD7u6fv_MaYV1d5Z4lWKYVasgft2HcDG',
    },
       {
        title: 'spark_sales.csv',
        url:'https://drive.google.com/uc?export=download&id=1cyEfnPHxYvcHO9GhJHRcMqaPkx9SUWYF' ,
    },
       {
        title: 'Spark.docx',
        url:'https://docs.google.com/document/d/1FA_-KgRmqIXAYJNSvH3-m9xDcZE9IOB0/export?format=docx' ,
    },
      {
        title: 'Big-Data-NoSQL.docx' ,
        url: 'https://docs.google.com/document/d/1FAtRpSsthQ1W2bfkfmdJ7EkkblhtHdYU/export?format=docx',
    },
      {
        title: 'Data-arch.docx' ,
        url: 'https://docs.google.com/document/d/1I0l16V15TKEaUsI7y_Zme4RhbHj1NNw2/export?format=docx',
    },
      {
        title: 'Primer_Pipelines.docx',
        url: 'https://docs.google.com/document/d/1mqlhP6CkxbPYDodE3xg7C5r5wm-mlacb/export?format=docx',
    },
      {
        title: 'student_data.csv',
        url: 'https://drive.google.com/uc?export=download&id=1d2kRt6ATQ1vL3zkjEZSOQ4YsTNOmcEZA',
    },
      {
        title: 'autoML.docx',
        url: 'https://docs.google.com/document/d/1vvfhsz6NIp945jn_SjThkHRq1ITXPhb2/export?format=docx',
    },
        {
        title: 'python-pp.docx',
        url: 'https://docs.google.com/document/d/12YM-md8Q8RxgflIMgKhkrkSOMa27fqdr/export?format=docx',
    },
        {
        title: 'sales.csv',
        url: 'https://drive.google.com/uc?export=download&id=1m4by1Dz08nzmz_iPOtQdYCaYQiMZXyUF',
    },{
        title: 'cloud-stream.docx',
        url: 'https://docs.google.com/document/d/1WmmL2PC9g0nRH-9ch0NNFy9TsiIXl8Fb/export?format=docx' ,
    },
          {
        title: 'sparkstr.docx',
        url: 'https://docs.google.com/document/d/1n142K7zoON8MDWrnHFZ3UXe2uIMIswVu/export?format=docx' ,
    }


  ],
    'Tableau': [
    {
      title: 'Superstore.csv',
      url: 'https://drive.google.com/uc?export=download&id=1MCiEoGHPR50BnQlXTwVFFqNlVsB6XHHH',
    },
    {
      title: 'Tableau.docx',
      url: 'https://docs.google.com/document/d/1eGSY_CVzLKX0Vmm9pOuKvlLmtT-KMHXQ/export?format=docx',
    },

  ],
};