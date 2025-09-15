export interface Topic {
  name: string;
  link?: string;
  url?:string;
  assignments?: string[];
 file?: string;
  children?: Topic[];
}

export const backupPPTs: Record<string, Topic[]> = {
"Data-Science": [
     {
    name: "Data Science",
    children: [
      {
        name: "Crisp ML (Q)",
         children:
         [
          {
            name: "Crisp ML (Q)",
        link: "https://docs.google.com/presentation/d/1yXeAMQXitNLZm_9MmAFBRUUU6xmmABeE/preview",
        assignments: [
          "https://drive.google.com/uc?export=download&id=17rcLQ2roOeywbXdIyPDLLoMiqvuftR9L",
        ],
      },
       {
          name: "Problem Statement_CRISP_ML(Q).zip",
          file: "https://drive.google.com/uc?export=download&id=1R_RPYMMJBATBQl74qDiM2SdJrhrNYVgw",
          assignments: [],  
        },
    ],
      },
      {
        name: "Data Types and Inferential Statistics",
        children:[
          {
            name: "Data Types and Inferential Statistics",
        link: "https://docs.google.com/presentation/d/1p4YMkniBcLFuJXdI0EEjJuuYlv0VZDTJ/preview",
        assignments: [
          "https://drive.google.com/uc?export=download&id=17rcLQ2roOeywbXdIyPDLLoMiqvuftR9L",
        ],
      },
         {
          name: "Problem Statements_Data Types and Inferential Statistics.zip",
          file: "https://drive.google.com/uc?export=download&id=1KMFGhopJNN_XLgPgy69rdHqacW99Pjk1",
          assignments: [],
        },
    ],
      },
      {
        name: "Business Moment",
         children:[
          {
             name: "Business Moment",
        link: "https://docs.google.com/presentation/d/1hElVRlRnPcVWxaPT5QUE2O5DxwDUQJfT/preview",
        assignments: [],
      },
      
    ],
  },
      {
        name: "Graphical Representation",
        children:[
          {
        name: "Graphical Representation",
        link: "https://docs.google.com/presentation/d/1h4UW3RojLCkGQsJczdgmgkbqj2od6G0I/preview",
        assignments: [],
      },
       {
          name: "Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=1JV2uOD1THqUerJTrmLkVbB_-uKJl-T21",
          assignments: [],
        },
         {
          name: "Problem Statement_Graphical Representation.zip",
          file: "https://drive.google.com/uc?export=download&id=15HfFNJV-GqsnYJduw38SiasO6UediHdh",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Mathematical Foundations",
        children:
        [
          {
        name: "Mathematical Foundations",
        link: "https://docs.google.com/presentation/d/1yn4dsHa3TNQCBrkbpnBZWnxX38NtGFG0/preview",
        assignments: [],
      },
      {
          name: "Problem Statement_Mathematical Foundations.zip",
          file: "https://drive.google.com/uc?export=download&id=1swQXQ7WjwXQZ6WSjPVwsIpp9FMQkm_tF",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Data Mining and Hierarchical Clustering - 1",
        children:
        [
          {
             name: "Data Mining and Hierarchical Clustering - 1",
        link: "https://docs.google.com/presentation/d/1tE0cvVXFDNQ6eUzULfZ-ZnhgiCvstjKf/preview",
        assignments: [],
      },
    ],
  },
      {
        name: "Hierarchical Clustering - 2",
        children:
        [
          {
        name: "Hierarchical Clustering - 2",
        link: "https://docs.google.com/presentation/d/1iyXUqcAczcqbEgE4C0xho_lQVdIvo55b/preview",
        assignments: [],
      },
      {
          name: "Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=1eAG1OL1VygBKJQo41CgbchO_BxTvHbJt",
          assignments: [], 
        },
         {
          name: "Problem Statement_Hierarchical Clustering.zip",
          file: "https://drive.google.com/uc?export=download&id=1ld_hvw6ySKFDBwx-PTOoSoUv7RTTIPF1",
          assignments: [],
        }, 
    ],
  },
      {
        name: "K-means Clustering",
        children:
        [
          {
             name: "K-means Clustering",
        link: "https://docs.google.com/presentation/d/1_h3CNR_x0iAfrKLgZEBFjLBrC__KkhPM/preview",
        assignments: [],
      },
      {
          name: "Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=16g4XEUOWwC9eakhweL0QaYr0Pb2hbri9",
          assignments: [], 
        },
         {
          name: "Problem Statement_K-means.zip",
          file: "https://drive.google.com/uc?export=download&id=1ISOk2lNPXhii1dZTCrl63TkJfbyOWg4W",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Dimensionality Reduction - PCA",
        children:
        [
          {
             name: "Dimensionality Reduction - PCA",
        link: "https://docs.google.com/presentation/d/1aGhj7xptp7cJnohNndDUaxUXCj_Yb8Fn/preview",
        assignments: [],
      },
        {
          name: "Assignments Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=1GCePrFn2beUkTxMZyVOdwx0MMNt97Jk4",
          assignments: [], 
        },
         {
          name: "Problem Statements_Dimensionality Reduction.zip",
          file: "https://drive.google.com/uc?export=download&id=1HaqvbLISnzRSNex0pTHoFNJawlMDvebM",
          assignments: [],
        },

    ],
  },
      {
        name: "Dimensionality Reduction - SVD & Recap",
         children:[
          {
             name: "Dimensionality Reduction - SVD & Recap",
        link: "https://docs.google.com/presentation/d/1bfpBcXp2DyAzw4Ui40b-l8-_s7Bv2GoH/preview",
        assignments: [],
      },
    ],
  },
      {
        name: "Association Rule - 1",
          children:[
          {
             name: "Association Rule - 1",
        link: "https://docs.google.com/presentation/d/1CIUkcmkhtQQgRJYw76S6DRWdZv-GT-Fl/preview",
        assignments: [
          "https://drive.google.com/uc?export=download&id=1ZvNH7mt8mnUxIib_zllXsMuGkEvgnDwb",
        ],
      },
       ],
  },
      
      {
        name: "Association Rule - 2 and Recommendation Engine - 1",
        children:[
          {
          name:  "Association Rule - 2 and Recommendation Engine - 1",
          link: "https://docs.google.com/presentation/d/1Hg4JYyl_CGBIZqtygFupfF2vdnG4-3BU/preview",
          assignments: [
          "https://drive.google.com/uc?export=download&id=1PwgVBkdnkQsPTFACPC7t0vargZGjwk8f",
        ],
      },
       {
          name: "Assignments Datasets_Association Rules-2.zip",
          file: "https://drive.google.com/uc?export=download&id=1DJNPPbhj_SZZbSQnlnVaeM6gIBKvw9xM",
          assignments: [],  
        },
         {
          name: "Problem Statements_Association Rules-2.zip",
          file: "https://drive.google.com/uc?export=download&id=1E47Z_Y-i1xAAGrc07NzIsECQzkgUX1uQ",
          assignments: [],
        },

      ],
      },

      {
        name: "Recommendation Engine - 2 & Network Analytics",
        children:[
          {
             name: "Recommendation Engine - 2 & Network Analytics",
        link: "https://docs.google.com/presentation/d/1wWjwiNAcftfO66gmQZT7dpBIeeeLlCPg/preview",
        assignments: [
          "https://drive.google.com/uc?export=download&id=1PwgVBkdnkQsPTFACPC7t0vargZGjwk8f",
        ],
      },
      {
          name: "Datasets_Network Analytics.zip",
          file: "https://drive.google.com/uc?export=download&id=1FvEOKYI4l-ThvhyAf8fI16Q3jMPveQJU",
          assignments: [], 
        },
         {
          name: "Datasets_Recommendation Engine.zip",
          file: "https://drive.google.com/uc?export=download&id=1GLGmF16TtUX09eezun4iO9JNP_wModd5",
          assignments: [],
        }, 
        {
         name: "Problem Statement_Network Analytics.zip",
          file: "https://drive.google.com/uc?export=download&id=1PJ5E1QLNUeEn6QCIrXUUC-6s91YX6bw4",
          assignments: [],
        },
         {
         
           name: "Problem Statement_Recommendation Engine_.zip",
          file: "https://drive.google.com/uc?export=download&id=1eLpSxcMDaEjbnyKpCFubzU3lb1fgA-Nf",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Advanced Regression for Count Data",
         children:
        [
          {
            name: "Advanced Regression for Count Data",
        link: "https://docs.google.com/presentation/d/1kAban4f0Uuqk_mKTjLmBOW4dOEfmvKt3/preview",
        assignments: [
          "https://drive.google.com/uc?export=download&id=17rcLQ2roOeywbXdIyPDLLoMiqvuftR9L",
        ],
      },
    ],
  },
      {
        name: "Text Mining & Natural Language Processing (NLP) - 1",
         children:
        [
          {
            name: "Text Mining & Natural Language Processing (NLP) - 1",
        link: "https://docs.google.com/presentation/d/1fMKwm1ljPfssGYQl9RLqlGWWclCIuT1A/preview",
        assignments: [],
      },
    ],
  },
      {
        name: "Text Mining & Natural Language Processing (NLP) - 2",
        children:
        [
          {
             name: "Text Mining & Natural Language Processing (NLP) - 2",
        link: "https://docs.google.com/presentation/d/1LBGkkJFxCyuolK3wtSsMZSP8VWpjWaAf/preview",
        assignments: [],
      },
       {
          name: "Problem Statement_Text Mining.zip",
          file: "https://drive.google.com/uc?export=download&id=1325P5gTBnQVco0Ho9ee8mmm0u-LAxYeM",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Text Mining & Natural Language Processing (NLP) - 3",
        children:
        [
          {
             name: "Text Mining & Natural Language Processing (NLP) - 3",
        link: "https://docs.google.com/presentation/d/1Uxg8E41HDnxLDHaVkZ1-bG3Sx2NZK9BD/preview",
        assignments: [],
      },
   
         {
          name: "Problem Statement_NLP.zip",
          file: "https://drive.google.com/uc?export=download&id=15wm9z3B7EMoi_NT8t8lNy1x0T0v8un3S",
          assignments: [],
        }, 
           {
          name: "Python Code",
          file: "https://drive.google.com/uc?export=download&id=1moW6zEu1Et3GO0qnmk7QjWSnfNfxmQd7",
          assignments: [],
        },
    ],
  },
      {
        name: "Naive Bayes - Master Class",
        children:
        [
          {
            name: "Naive Bayes - Master Class",
        link: "https://docs.google.com/presentation/d/1HV6Nz8tu4t1PfFaZ_7G7u__0JBbzTE5r/preview",
        assignments: [],
      },
      {
          name: "Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=1PJ5E1QLNUeEn6QCIrXUUC-6s91YX6bw4",
          assignments: [], 
        },
         {
          name: "Problem Statement_Naive Bayes.zip",
          file: "https://drive.google.com/uc?export=download&id=1PxTlhjhB1FYG5yggyQeN8CeEYM-0pzr7",
          assignments: [],
        }, 
    ],
  },
      {
        name: "KNN & Decision Tree - 1",
        children:
        [
          {
        name: "KNN & Decision Tree - 1",
        link: "https://docs.google.com/presentation/d/1edNDvcgWUE3znFZDmrIz4OvtTEbzrmZa/preview",
        assignments: [],
      },
       {
          name: "Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=1BDM6zh5r_cuh0dC72yO1lLJ8Zr4bDQSM",
          assignments: [], 
        },
         {
          name: "Problem Statement_KNN.zip",
          file: "https://drive.google.com/uc?export=download&id=1re0FBIjN_t84AxWlAnvBZcXyNxWEAQ8D",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Decision Tree - 2_Master_Class",
        children:
        [
          {
              name: "Decision Tree - 2_Master_Class",
        link: "https://docs.google.com/presentation/d/1lyHBBb1bC-d-QU0T5su9OgeHZ3cvUyu0/preview",
        assignments: [],
      },
       {
          name: "Datasets Decision Tree_.zip",
          file: "https://drive.google.com/uc?export=download&id=1j8NREzaw8DEAmqNa-aa1VgVH8keUPPQm",
          assignments: [], 
        },
         {
          name: "Problem Statement_Decision Tree.zip",
          file: "https://drive.google.com/uc?export=download&id=16awwUnoljwS1GOuQ9AAgmrx4VlV8FurG",
          assignments: [],  
        },
    ],
  },
      {
        name: "Ensemble Techniques - 1",
          children:
        [
          {
             name: "Ensemble Techniques - 1",
        link: "https://docs.google.com/presentation/d/1tCelGZLEI-RB1th7W1i__RBE7Mvt75m8/preview",
        assignments: [],
      },
    ],
  },
      {
        name: "Ensemble Techniques - 2",
        children:
        [
          {
             name: "Ensemble Techniques - 2",
        link: "https://docs.google.com/presentation/d/1YQd-Aipw_F1M3G-knXkJBm4AhSVrTfPX/preview",
        assignments: [],
      },
       {
          name: "Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=1X-OpeWMYzr4fGnTvJRTbgNKmi10QULQ6",
          assignments: [], 
        },
         {
          name: "Problem Statements_Ensemble Models.zip",
          file: "https://drive.google.com/uc?export=download&id=16tOFm7S_zlqre9Fnwkfvp-AWx4xjV896",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Confidence Interval - 1",
        children:[
          {
            name: "Confidence Interval - 1",
        link: "https://docs.google.com/presentation/d/1C7iZmnKe7cAv5snL3DD3PvdO_N7Yk81p/preview",
        assignments: [
          "https://drive.google.com/uc?export=download&id=d/1vy7zWo5p8oSTZCkDJu-VPZR8b1PQ2bBg",
        ],
      },
       {
          name: "Datasets-Confidence Interval-1.zip",
          file: "https://drive.google.com/uc?export=download&id=1vy7zWo5p8oSTZCkDJu-VPZR8b1PQ2bBg",
          assignments: [],
        },
         {
          name: "Problem Statements_Confidence Interval-1.zip",
          file: "https://drive.google.com/uc?export=download&id=1e5dTK0bvGBo4p-8GGsydshTNufu7mXib",
          assignments: [],
        }, 


    ],
      },
      {
        name: "Confidence Interval - 2",
        children:
        [
        {
          name: "Confidence Interval - 2", 
        link: "https://docs.google.come/presentation/d/1CzEGVMPuW_ibgj2ZTl_mvzvz_WxfNht4/preview",
        assignments: [
          "https://drive.google.com/uc?export=download&id=1pRE6fEm4qYeuX3d97TevD7Sy1y434rwQ",
        ],
      },
       {
          name: "Problem Statements_Confidence Interval-2.zip",
          file: "https://drive.google.com/uc?export=download&id=1P68e5O-D5_VYSf34I87U-tGP2GmM4pHx",
          assignments: [],
        },
    ],
      },
      {
        name: "Hypothesis Testing - E Learning",
        children:
        [
          {
            name: "Hypothesis Testing - E Learning",
        link: "https://docs.google.com/presentation/d/1iXn1d4l-p_hkqnKE5i_rG9fCvuJFouKW/preview",
        assignments: [],
      },
       {
          name: "Datasets_Hypothesis Testing.zip",
          file: "https://drive.google.com/uc?export=download&id=1_SoNbWroL0OGKNz1xybI__c7Fgrxc0Lv",
          assignments: [],
        },
         {
          name: "Problem Statement_Hypothesis Testing.zip",
          file: "https://drive.google.com/uc?export=download&id=1Qv-GncLmrnSrbC6pCypnHSjWc9YFca8h",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Simple Linear Regression",
        children:
        [
          {
              name: "Simple Linear Regression",
        link: "https://docs.google.com/presentation/d/1WHFXogn8FNZxrmym4mRg_md9uaReSQ28/preview",
        assignments: [],
      },
       {
          name: "Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=1E6cgAWY28jkh-HlUABlTRkfRLwJeFPYH",
          assignments: [],
        },
         {
          name: "Problem Statement_SLR.zip",
          file: "https://drive.google.com/uc?export=download&id=1edLlb-rM6dx7LXSB-pLXqLDI4-mDKXWo",
          assignments: [],
        }, 
           {
          name: "Python Code",
          file: "https://drive.google.com/uc?export=download&id=1BHjBSawVkQIC5zSrzjNou92Q4MlmTrjO",
          assignments: [],
        },
    ]
  },
      {
        name: "Multiple Linear Regression",
        children:
        [
          {
       name: "Multiple Linear Regression",
        link: "https://docs.google.com/presentation/d/18eZN17d5YfAk-jxAmWO2lgkrhN76t7Y/preview",
        assignments: [],
      },
       {
          name: "Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=1t984qwu3sBMkqemBwPQswdwgNPbz-Yi7",
          assignments: [], 
        },
         {
          name: "Problem Statement_MLR.zip",
          file: "https://drive.google.com/uc?export=download&id=1dd_NVkHY2rxJSiOMMqCmNCgD9JYg4voG",
          assignments: [],
        }, 
           {
          name: "Python Code",
          file: "https://drive.google.com/uc?export=download&id=1iVJNJxdOlcsSE1YFF3d2hpe4atMUlz8A",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Linear Regression - 1",
          children:
        [
          {
            name: "Linear Regression - 1",
        link: "https://docs.google.com/presentation/d/1walOByRaJf4EcteXrhygWiq5plJ926Ow/preview",
        assignments: [],
      },
    ],
  },

      {
        name: "Logistic Regression Lasso & Ridge Regression",
        children:
        [
          {
             name: "Logistic Regression Lasso & Ridge Regression",
        link: "https://docs.google.com/presentation/d/10HLnF8JnLI7ZDONADfAii38QT4C6SMmK/preview",
        assignments: [],
      },
      {
          name: "Datasets_Logistic Regression.zip",
          file: "https://drive.google.com/uc?export=download&id=1QidFWQ5q-u6uETH48qG7eTnMoBbIa98i",
          assignments: [], 
        },
         {
          name: "Problem Statement_Logistic Regression.zip",
          file: "https://drive.google.com/uc?export=download&id=1ZCU9To8I_YomvqTjD7nQopsDNzc42gO_",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Multinomial Regression - E Learning",
        children:
      [
        {
           name: "Multinomial Regression - E Learning",
        link: "https://docs.google.com/presentation/d/1XKaPwXQ5LjkEZdlXOrcp7IiOw6KCPIw1/preview",
        assignments: [],
      },
      {
          name: "Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=1rsxECoZIlf_UhkOjyZGIBUxUJeivkHYs",
          assignments: [],
        },
         {
          name: "Problem Statement_Multinomial Regression.zip",
          file: "https://drive.google.com/uc?export=download&id=1ryNM70fycyz6dVgoefIB2gYqp-khgakU",
          assignments: [],
        }, 
           {
          name: "Python Code",
          file: "https://drive.google.com/uc?export=download&id=1Xmymu2UDLNUUVkMTTDT5fle6fTXSl_xW",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Ordinal Logistic Regression - E Learning",
        children:
        [
          {
              name: "Ordinal Logistic Regression - E Learning",
        link: "https://docs.google.com/presentation/d/1JpGL-HljdIzbYWP4bj7i9Uloe6JGqleA/preview",
        assignments: [],
      },
       {
          name: "Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=1gOopzX-zxzPf9FYroeR8CshE5u0meKSI",
          assignments: [], 
        },
         {
          name: "Problem Statement_Logistic Regression.zip",
          file: "https://drive.google.com/uc?export=download&id=1DL1O0wvha0AZzk6wfJkaqPzcw2oYgLJp",
          assignments: [],
        }, 
           {
          name: "Python Code",
          file: "https://drive.google.com/uc?export=download&id=1nl_pzJWOFDQEftfgk1f7oSd8sffjCHXK",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Advanced Regression for Count Data - E Learning",
         children:
        [
          {
              name: "Advanced Regression for Count Data - E Learning",
        link: "https://docs.google.com/presentation/d/1hElVRlRnPcVWxaPT5QUE2O5DxwDUQJfT/preview",
        assignments: [],
      },
        ],
      },
      {
        name: "SVM",
        children:
        [
          {
             name: "SVM",
        link: "https://docs.google.com/presentation/d/1Uu_lb4chXFCfxOIha0Lx4fcj_OAaTPlL/preview",
        assignments: [],
      },
       {
          name: "Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=1cQGNrhTTNgYSPj1ST6lreWgukIAqiG6o",
          assignments: [], 
        },
         {
          name: "Problem Statement_SVM.zip",
          file: "https://drive.google.com/uc?export=download&id=1QX4zK52k4pQejHtOHQCKYMwyBfuSXh2w",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Survival Analytics & Forecasting - 1",
        children:
        [
          {
            name: "Survival Analytics & Forecasting - 1",
        link: "https://docs.google.com/presentation/d/1A7lEsHySQQ_pFQvy57w15QVeTC6SgjGG/preview",
        assignments: [],
      },
       {
          name: "Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=1ILCuCDZFNgxm4XJKmxGhiE2Cex1yWQQ4",
          assignments: [], 
        },
         {
          name: "Problem Statement_Survival Analytics.zip",
          file: "https://drive.google.com/uc?export=download&id=1d6OPpHwqlLV3lQL96H7XfZ3fQUxlnwQ3",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Forecasting - 2",
         children:
        [
          {
             name: "Forecasting - 2",
        link: "https://docs.google.com/presentation/d/100rFgN9q_V9WfXGhE0Gcv8eu8jL1h6q2/preview",
        assignments: [],
      },
    ],
  },
      {
        name: "Forecasting - 3",
        children:
        [
          {
             name: "Forecasting - 3",
        link: "https://docs.google.com/presentation/d/1_j34sq9v3I_4UR1bEeUYMfxz0vOLsAYP/preview",
        assignments: [],
      },
       {
          name: "Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=1WLN3ALUNU-DWjmLoyBJ6X96ycJyZ8zVQ",
          assignments: [], 
        },
         {
          name: "Problem Statement_Forecasting-3.zip",
          file: "https://drive.google.com/uc?export=download&id=1qMEMU0LI6jqc8xOUPUzelxgduVV9-kpm",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Neural Network - Master Class",
        children:
        [
          {
                name: "Neural Network - Master Class",
        link: "https://docs.google.com/presentation/d/1GTQ-SWPGuSKdKSPetmhmSXlO_TJu3VW4/preview",
        assignments: [],
      },
         {
          name: "Assignments_Datasets.zip",
          file: "https://drive.google.com/uc?export=download&id=17u0tyktyghhb_Noo-7l-T7pGNbbBy4j6",
          assignments: [], 
        },
         {
          name: "Problem Statement_Neural Network.zip",
          file: "https://drive.google.com/uc?export=download&id=1gHahh0i8URtsvqH_USjvoBQrZ1Qqwc-N",
          assignments: [],
        }, 
    ],
  },
      {
        name: "Convolutional Neural Network (CNN) - Master Class",
        children:[
          {
             name: "Convolutional Neural Network (CNN) - Master Class",
        link: "https://docs.google.com/presentation/d/1OqBeOyykd04391nSCoTWRzuDZgjIqkbB/preview",
        assignments: [
          "https://drive.google.com/uc?export=download&id=1sTkp1kpeiAZ3KL-TvzHZtMisYnjWqAn9",
        ],
      },
         {
          name: "CNN_Problem Statement",
          file: "https://drive.google.com/uc?export=download&id=1S91fXRyhNit8yUHfDmOjTjnliIMbC6hx",
          assignments: [],
        },  
    ],
      },
      {
        name: "Recurrent Neural Network",
        children:
        [
          {
             name: "Recurrent Neural Network",
        link: "https://docs.google.com/presentation/d/1SQyaslHxAV369jShmfClshbzw2nw7aSH/preview",
        assignments: [],
      },
      {
          name: "RNN_Problem Statement",
          file: "https://drive.google.com/uc?export=download&id=1WcPD8ct3fWB50eELlnT9fc5uxV0xbQSN",
          assignments: [],
        },  
    ],
  },
    ]
}
],
  SQL: [
     {
    name: "SQL",
    children: [
      {
        name: "1 - SQL Introduction",
          children:
        [
          {
             name: "SQL Introduction",
        link: "https://docs.google.com/presentation/d/1BECUfhOhXTDWfNPJZDxw4gA1giWYwK1E/preview",
        assignments: [],
      },
    ],
  },
      {
        name: "2 - Introduction to DBMS and RDBMS",
          children:
        [
          {
              name: "Introduction to DBMS and RDBMS",
        link: "https://docs.google.com/presentation/d/1kRJxhgK8ShxRfFRWKMElktz52u1qgWXo/preview",
        assignments: [],
      },
    ],
  },
      {
        name: "3 - Installation Steps for MySQL for Windows",
          children:
        [
          {
             name: "Installation Steps for MySQL for Windows",
        link: "https://docs.google.com/presentation/d/1AbhTDz1cjwZxkhJRdZNnPIar1RIRdlnL/preview",
        assignments: [],
      },
    ],
  },
      {
        name: "4 - SQL Operators",
          children:
        [
          {
                 name: "SQL Operators",
        link: "https://docs.google.com/presentation/d/1gjEb5G9LFgT0fZ8XPBqh1lWvtUIO2VP3/preview",
        assignments: [],
      },
    ],
  },
      {
        name: "5 - SQL Constraints",
          children:
        [
          {
            name: "SQL Constraints",
        link: "https://docs.google.com/presentation/d/192soPE6O_xZ1z5QyIcBgcJ-f1NbmKvjR/preview",
        assignments: [],
      },
    ],
  },
    ],
}
  ],

 "Power-BI": [
  {
    name: "PowerBI Fundamentals",
    children: [
      {
        name: "1 - Course Outline",
          children:
        [
          {
             name: "Course Outline",
        link: "https://docs.google.com/presentation/d/1Y6i26XAA8OTZFrUSKQugal_zJUHPF3iu/preview",
         assignments: [],
      },
    ],
  },
      {
        name: "2 - Installation",
          children:
        [
          {
             name: "Installation",
        link: "https://docs.google.com/presentation/d/19FoSK-2SB7Lf7ZF8zkXyMmyhiV5GWIEe/preview",
         assignments: [],
      },
    ],
  },
      {
        name: "3 - Study Material",
          children:
        [
          {
               name: "Study Material",
        link: "https://docs.google.com/presentation/d/1e6XjemjvS-gqSl6OPqv1WW96dqpGoPCa/preview",
         assignments: [],
      },
    ],
  },
      {
        name: "4 - Power BI Desktop",
          children:
        [
          {
             name: "Power BI Desktop",
        link: "https://docs.google.com/presentation/d/1cka_VZaaO4bvj7P8t4kv2-0pkkM6c4PD/preview",
         assignments: [],
      },
    ],
  },
      {
        name: "5 - Data Analysis & Expressions",
          children:
        [
          {
               name: "Data Analysis & Expressions",
        link: "https://docs.google.com/presentation/d/1vo-YL8BAcqLyOXP9q7NY4J-YZincoGPF/preview",
         assignments: [],
      },
    ],
  },
      {
        name: "6 - Data Visualization",
          children:
        [
          {
             name: "Data Visualization",
        link: "https://docs.google.com/presentation/d/1HoNySzogrZ7lpHj0xQm35h5HnF3Pi_fG/preview",
         assignments: [],
      },
    ],
  },
      {
        name: "7 - Power BI Insights & Q&A",
          children:
        [
          {
             name: "Power BI Insights & Q&A",
        link: "https://docs.google.com/presentation/d/1CTQAbaUC6JVQuSwrBusUTzF5WHCSK8pF/preview",
         assignments: [],
      },
    ],
  },
      {
        name: "8 - Direct Connectivity",
          children:
        [
          {
               name: "Direct Connectivity",
        link: "https://docs.google.com/presentation/d/1SDtCVbvO7y4NFfX3tmhKocuVqlK05RkV/preview",
         assignments: [],
      },
        ],
      },
      {
        name: "9 - Power BI Report Server",
          children:
        [
          {
              name: "Power BI Report Server",
        link: "https://docs.google.com/presentation/d/163_PW-vqXkkML4blKXeTgZfRPrJVekhy/preview",
         assignments: [],
      },
    ],
  },
      {
        name: "10 - Advance Analytics",
          children:
        [
          {
             name: "Advance Analytics",
        link: "https://docs.google.com/presentation/d/1cORB8h2FXFMpdUn6ZHRfQLYTHb1Zs2R9/preview",
         assignments: [],
      },
    ],
  },
    ],
  },
],


          // Data Engineering

"Data-Engineering": [
  {
    name: "Data-Engineering",
    children: [
      {
        name: "1 - Data Science primer & ML Pipeline",
        children: [
          {
            name: "Data Science primer & ML Pipeline",
            link: "https://docs.google.com/presentation/d/1Vg4rRBJC0TFpeRMUZmYGPjxbOEPEorGw/preview",
            assignments: [],
          },
          {
            name: "Python Codes",
            file: "https://drive.google.com/uc?export=download&id=1c1EeKXOyj02-e_LJhxF1AOPLy8qED2Up",
            assignments: [],
          },
          {
            name: "Datasets",
            file: "https://drive.google.com/uc?export=download&id=1v3Pu737qeeev9-16trZDhsfoAZPB2Z4f",
            assignments: [],
          },
          {
            name: "Basic Py Code",
            file: "https://drive.google.com/uc?export=download&id=1cbCQnmXxfxNxjLu3j-aK0ypqOKfLlS5g",
            assignments: [],
          },
        ],
      },
  {
    name: "2 - Data Architecture",
    children: [
          {
            name: "Data Architecture",
            link: "https://docs.google.com/presentation/d/1oWCXxt9VpMfLYxCguva2Rnmd7AIs5Ot6/preview",
            assignments: [],
          },
          {
            name: "MySQL",
            link: "https://docs.google.com/presentation/d/146RWcvauYbxeV8ASCj1MKe4oJ2ycxOoF/preview",
            assignments: [],
          },
          {
            name: "Postgre_SQL",
            link: "https://docs.google.com/presentation/d/1he-jCNSLPmnk9r-fpaX3HGm0v0Tl3uTb/preview",
            assignments: [],
          },
          {
            name: "Postgre SQL Command",
            file: "https://drive.google.com/uc?export=download&id=1R124A7aSlkTjSxRmMmq0gAgLQD4KQdCO",
            assignments: [],
          },
          {
            name: "Python Codes",
            file: "https://drive.google.com/uc?export=download&id=11b-jN68jbPhKXFf8hCdsazVcxVIpMUA8",
            assignments: [],
          },
          {
            name: "Pet_Details_Datasets",
            file: "https://drive.google.com/uc?export=download&id=1-s5x02bInizkQaKvAjJqsmnwn4hX2Nq",
            assignments: [],
          },
          {
            name: "Postgre_SQL",
            file: "https://drive.google.com/uc?export=download&id=1R9ELcCTptslvrvKByQm8SCRCoXiWb_mt",
            assignments: [],
          },
          {
            name: "Postgre SQL Installation in windows",
            link: "https://drive.google.com/file/d/17ANh5o76Zb-KdqSmBUlUTOaw_yHvF1X8/preview",
            assignments: [],
          },
          {
            name: "Postgre SQL Installation in MAC",
            link: "https://drive.google.com/file/d/1os4Gu1WwqZHUmj0XAlGt5OgKs_t5iirl/preview",
            assignments: [],
          },
          {
            name: "MySQL Workbench Installation in MAC",
            link: "https://drive.google.com/file/d/1B_EAbay3ytZGeLTatMGTO8N5D150orv4/preview",
            assignments: [],
          },
        ],
      },
  {
    name: "3 - Python Data Processing",
    children: [
      {
            name: "Datasets",
            file: "https://drive.google.com/uc?export=download&id=1dtUSc3bICuOyTHELT7IbYKE1JaSX-zqW",
            assignments: [],
          },
          {
            name: "Python Codes",
            file: "https://drive.google.com/uc?export=download&id=1GngupfNXASdBM_NBqbUHK91vX3NfkiHJ",
            assignments: [],
          },
        ],
      },
  {
    name: "4 - Big Data  & MySQL",
    children: [
      {
            name: "MongoDB",
            link: "https://docs.google.com/presentation/d/1O8Qq39UNDJ38_ZikWXRQTVKCW1srlrdq/preview",
            assignments: [],
          },
          {
            name: "Apache HBASE",
            link: "https://docs.google.com/presentation/d/1mZWJmREwfHlg-dtsz913rfOdbYnRYjOB/preview",
            assignments: [],
          },
          {
            name: "Distributed Framework & Hadoop",
            link: "https://docs.google.com/presentation/d/18-ARxRra8rdr5AaheibE8Qlxo3jA-xSG/preview",
            assignments: [],
          },
          {
            name: "MongoDB Commands",
            file: "https://drive.google.com/uc?export=download&id=1eKZbnNL1k5O5T13D8sPdbqEKsL9SKh0O",
            assignments: [],
          },
          {
            name: "MongoDB Python_Code",
            file: "https://drive.google.com/uc?export=download&id=1J1AM1EIaJReO5lTV3BEusZYiDnF7NPk4",
            assignments: [],
          },
        ],
      },
       {
    name: "5 - ML Pipeline on Cloud AutoML",
    children: [
      {
            name: "AWS Sagemaker",
            link: "https://docs.google.com/presentation/d/11h8p1PRUYZOPt_piAkCXG60cuNH1FqAr/preview",
            assignments: [],
          },
          {
            name: "GCP AutoML",
            link: "https://docs.google.com/presentation/d/1Xw1PLB03Uzs7y4JsVvPGCDwWB0XyoNFQ/preview",
            assignments: [],
          },
          {
            name: "Azure AutoML",
            link: "https://docs.google.com/presentation/d/1UVSZFCtjKVtmstQ61K40eRF_R0rg4q73/preview",
            assignments: [],
          },
          {
            name: "Module4_Datasets",
            file: "https://drive.google.com/uc?export=download&id=1G8qyxdcWCi_wQMG4gsfGAss4sTJpVSDi",
            assignments: [],
          },
        ],
      },
  {
    name: "6 - Apache Spark",
    children: [
      {
            name: "Sparks in Windows",
            file: "https://drive.google.com/uc?export=download&id=15ItIRKWQAV-Yqa2LuOPOGtiNhQw9az9x",
            assignments: [],
          },
          {
            name: "Sparks Hands-On",
            file: "https://drive.google.com/uc?export=download&id=1Qqw3Td7sjZLHoRm6Ciq7QcqGJc4ZhG2Z",
            assignments: [],
          },
        ],
      },
  {
    name: "7 - Apache Kafka",
    children: [
      {
            name: "Apache Kafka",
            link: "https://docs.google.com/presentation/d/1uFXijnJsOD6MqvStOnrd_fLkR_tKZAE2/preview",
            assignments: [],
          },
          {
            name: "Apache Kafka Installation and Configuration.zip",
            file: "https://drive.google.com/uc?export=download&id=1_OuZ7JSO0DoDzCEOMtOSpTXjGbPScf5-",
            assignments: [],
          },
          {
            name: "Apache Kafka on GCP.zip",
            file: "https://drive.google.com/uc?export=download&id=1PHeKLR2HM9gfbplt8Wg3SqVp4pUiLa5q",
            assignments: [],
          },
        ],
      },
  {
    name: "8 - Real Time Streaming on Cloud(Azure & GCP)",
    children: [
      {
            name: "Live Streaming Data Processing in GCP",
            link: "https://docs.google.com/presentation/d/1jM2dZ4CdMM0JpkCkwYevw-tSLv7RWKMs/preview",
            assignments: [],
          },
          {
            name: "IoT Code UseCase.zip",
            file: "https://drive.google.com/uc?export=download&id=12E4sxWn5jdTsPEmC-uPfQ1SYmhprt1DN",
            assignments: [],
          },
        ],
      },
  {
    name: "9 - Spark Streaming",
    children: [
      {
            name: "Live Streaming Data Processing in GCP",
            link: "https://docs.google.com/presentation/d/1HmJVFNa7h-jrl8Xwd9trOIAUKWxWr70s/preview",
            assignments: [],
          },
          {
            name: "Spark Setup on Ubuntu(1).zip",
            file: "https://drive.google.com/uc?export=download&id=1o1RvtqMXnhuOFuCDxS8ubms2NZzt7OWA",
            assignments: [],
          },
          {
            name: "Spark Streaming_code_Example.zip",
            file: "https://drive.google.com/uc?export=download&id=1gerX1BMfJpYZLH_YcHZoG53Btr8bvs9E",
            assignments: [],
          },
          {
            name: "Spark_streaming_TCP.zip",
            file: "https://drive.google.com/uc?export=download&id=1ib1Nhr2Pj3wR2rpM3PuhaiuvmtjXrLHn",
            assignments: [],
          },
        ],
      },
  {
    name: "10 - Apache Nifi & Apache Airflow",
    children: [
      {
            name: "Apache Nifi.zip",
            file: "https://drive.google.com/uc?export=download&id=1rwaaCJULd4IMZ_G3uWszPmQQqeXJYoL5",
            assignments: [],
          },
          {
            name: "PySpark_Dataset.crdownload",
            file: "https://drive.google.com/uc?export=download&id=1ZIOL0imy6Xwi-JwCFiaSDO7TG4LoeXiO",
            assignments: [],
          },
          {
            name: "Apache Airflow_Dataset.zip",
            file: "https://drive.google.com/uc?export=download&id=1luB_NM4gZesj7WofbZb0wdEsqy7U3_hG",
            assignments: [],
          },
          {
            name: "Airflow_PythonCodes.zip",
            file: "https://drive.google.com/uc?export=download&id=1JYX_aIMHACa_rQ0IV4skXjXPRWn1BRTq",
            assignments: [],
          },
        ],
      },
    ],
  },
],

//Tableau
   "Tableau": [
    {
      name: "Tableau Fundamentals",
      children: [
        {
          name: "1 - Tableau Data Visualization",
           children: [
            {
              name: "1 - Tableau Data Visualization",
          link: "https://docs.google.com/presentation/d/1vvjTubEE5EjR4zf5mGl3tKS6L_mEH76p/preview",
          assignments: [],
        },
        {
          name: "2 - Data Sources",
          
          file: "https://drive.google.com/uc?export=download&id=1f3c_2b_pmhnKMmcywJb7446CMA3USvuy",
          assignments: [], 
        },
        {
          name: "3 - New Datasets",
          file: "https://drive.google.com/uc?export=download&id=1Sc5pEOmcMIk9slbAf3TfWAIzjzTz3zBs",
          assignments: [], 
        },
      ],
    },
        {
          name: "2 - Tableau Architecture",
              children: [
            {
              name: "Tableau Architecture",
          link: "https://docs.google.com/presentation/d/18cGFZ0poFqqPKHpbPbsX6WzDMle36q95/preview",
          assignments: [],
        },   
      ],
    },

        {
          name: "3 - Basic Charts in Tableau",
              children: [
            {
               name: "Basic Charts in Tableau",
          link: "https://docs.google.com/presentation/d/18cGFZ0poFqqPKHpbPbsX6WzDMle36q95/preview",
          assignments: [],
        },
        {
          name: "Workbook.zip",
          file: "https://drive.google.com/uc?export=download&id=1lBW2GXdzr1FhpxWmQ490wMe6RvdPnM8C",
          assignments: [],
        },
      ],
    },

     {
          name: "4 - Organizing & Simplifying Data",
              children: [
            {
               name: "Orginization Tableau",
          link: "https://docs.google.com/presentation/d/1ydh6yxhV7w8uAatLuJTEFKISRqGvDXVi/preview",
          assignments: [],
        },
        {
          name: "Workbook.zip",
          file: "https://drive.google.com/uc?export=download&id=1O3G4o8TnrzezwKkObm1J1nYuSRTGdBFS",
          assignments: [],
        },
      ],
    },
     

    
      ],
    },
  ],

};
