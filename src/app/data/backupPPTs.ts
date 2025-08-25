export interface Topic {
  name: string;
  link: string;
  assignments?: string[];
}

export const backupPPTs: Record<string, Topic[]> = {
  "Data-Science": [
     { 
        name: "Advanced Regression for Count Data",
        link:"https://docs.google.com/presentation/d/1kAban4f0Uuqk_mKTjLmBOW4dOEfmvKt3/preview" ,
        assignments : [
            "https://drive.google.com/uc?export=download&id=17rcLQ2roOeywbXdIyPDLLoMiqvuftR9L"
   ] },
     { name: "Association Rule - 1",
        link:"https://docs.google.com/presentation/d/1CIUkcmkhtQQgRJYw76S6DRWdZv-GT-Fl/preview" ,
         assignments:
         ["https://drive.google.com/uc?export=download&id=1ZvNH7mt8mnUxIib_zllXsMuGkEvgnDwb"
  ]},
      { name: "Association Rule - 2 and Recommendation Engine - 1",link:"https://docs.google.com/presentation/d/1Hg4JYyl_CGBIZqtygFupfF2vdnG4-3BU/preview" , assignments:["https://drive.google.com/uc?export=download&id=1PwgVBkdnkQsPTFACPC7t0vargZGjwk8f"

      ]},
    { name: "Business moment",
         link:"https://docs.google.com/presentation/d/1hElVRlRnPcVWxaPT5QUE2O5DxwDUQJfT/preview"
        , 
         assignments: [],
    },

    { name: "Confidence Interval - 1", 
        link: "https://docs.google.com/presentation/d/1C7iZmnKe7cAv5snL3DD3PvdO_N7Yk81p/preview" , 
        assignments:["https://drive.google.com/uc?export=download&id=d/1vy7zWo5p8oSTZCkDJu-VPZR8b1PQ2bBg"
  ]},
     { name: "Confidence Interval - 2", link: "https://docs.google.com/presentation/d/1CzEGVMPuW_ibgj2ZTl_mvzvz_WxfNht4/preview" , assignments:["https://drive.google.com/uc?export=download&id=1pRE6fEm4qYeuX3d97TevD7Sy1y434rwQ"] },
    { name: "Convolutional Neural Network (CNN)", link: "https://docs.google.com/presentation/d/1OqBeOyykd04391nSCoTWRzuDZgjIqkbB/preview" , assignments:["https://drive.google.com/uc?export=download&id=1sTkp1kpeiAZ3KL-TvzHZtMisYnjWqAn9" ]},
    {name: "Copy of Recommendation Engine -2" , link:"https://docs.google.com/presentation/d/1rP6_yug2UxvWdszl9-vNQlnI4dl8Iy9C/preview",
   assignments: [],

    }
  ],
  SQL: [
    {name: "1 SQL Introduction", link:"https://docs.google.com/presentation/d/1BECUfhOhXTDWfNPJZDxw4gA1giWYwK1E/preview",
         assignments: [],
    },
    {name: "2 Introduction to DBMS and RDBMS", link: "https://docs.google.com/presentation/d/1kRJxhgK8ShxRfFRWKMElktz52u1qgWXo/preview",
         assignments: [],
    },
   {name: "3 Installation Steps for MySQL for windows", link: "https://docs.google.com/presentation/d/1AbhTDz1cjwZxkhJRdZNnPIar1RIRdlnL/preview" ,
     assignments: [],
   },
   {name: "4 SQL Operators", link: "https://docs.google.com/presentation/d/1gjEb5G9LFgT0fZ8XPBqh1lWvtUIO2VP3/preview"
    ,  assignments: [],
   },
   {name: "5 SQL Constraints", link: "https://docs.google.com/presentation/d/192soPE6O_xZ1z5QyIcBgcJ-f1NbmKvjR/preview",
     assignments: [],
   },
  ],
  "Power-BI": [
     {name: "1 - Course Outline", link: "https://docs.google.com/presentation/d/1Y6i26XAA8OTZFrUSKQugal_zJUHPF3iu/preview",
         assignments: [],
     },
    {name: "2 - Installation", link: "https://docs.google.com/presentation/d/19FoSK-2SB7Lf7ZF8zkXyMmyhiV5GWIEe/preview",
         assignments: [],
    },
   {name: "3 - Study Material",link:  "https://docs.google.com/presentation/d/1e6XjemjvS-gqSl6OPqv1WW96dqpGoPCa/preview",
     assignments: [],
   },
    {name: "4 - Power BI Desktop", link:"https://docs.google.com/presentation/d/1cka_VZaaO4bvj7P8t4kv2-0pkkM6c4PD/preview",
         assignments: [],
    },

    {
        name:"5 - Data Analysis & Expressions" ,
        link: "https://docs.google.com/presentation/d/1vo-YL8BAcqLyOXP9q7NY4J-YZincoGPF/preview",
        assignments:[],
    },
    {
        name: "6 - Data Visualization", link:"https://docs.google.com/presentation/d/1MJ3TsDgAN31f-UviHIYJZN-52GL8e_Hh/preview",
         assignments: [],
    },
    {
          name: "10 - Advance Analytics", link:"https://docs.google.com/presentation/d/1cORB8h2FXFMpdUn6ZHRfQLYTHb1Zs2R9/preview",
         assignments: [],
    }
  ],
};
