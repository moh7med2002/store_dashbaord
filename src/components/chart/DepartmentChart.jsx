import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);



export default function DepartmentChart() {

    const {token} = useSelector((state)=>state.admin)
    const [departments, setDepartments] = React.useState([]);
    const [isFetch , setIsFetch] = useState(false);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' ,
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      };

      const [data , setData] =  useState();

    

    useEffect(()=>{
        async function getDepartments () {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/admin/department/calc`,{
                    method:"Get",
                    headers:{
                        'Authorization':token,
                    },
                })
                const dataRes = await response.json()
                if(response.status!==200&&response.status!==201)
                {
                    throw new Error('failed occured')
                }
                const labels = dataRes.data.map(da=>da._id);
                const colors = [
                    '#F7464A',
                    '#1565C0',
                    "#F9A825",
                    '#1565C0',
                    '#2E7D32',
                    '#00838F',
                    "#6A1B9A"
                ];
                setData({
                    labels,
                    datasets:[
                        {
                            label:"# of category",
                            data:dataRes.data.map(da=>da.count),
                            backgroundColor:colors,
                            borderColor:colors,
                            borderWidth: 1,
                        }
                    ]
                });
                setIsFetch(true);
            }
            catch(err)
            {
                console.log(err);
            }
        };
        getDepartments();
    },[token]);


    return (
        <>
        {isFetch && <Pie data={data} />}
        </>
    )
  }

