import { useEffect, useState } from 'react';
import TableSW from './Table/Table';
import { useActionData, useLoaderData, useParams, useSubmit } from "react-router-dom";
import Header from './Header/Header';
import { Skeleton } from '@mui/material';
import styles from '../App.module.scss';
import { PageLinks } from '../types/categories';

function Root (props: any) {
    const { type = 'all' } = useParams();
    const [tableData, setTableData] = useState<any>([]);

    const actionData = useActionData();
    const loaderData: any = useLoaderData();

    const submit = useSubmit();

    useEffect(() => {
      let page = window.location.pathname;
      if (page === '/') {
        page = PageLinks.All;
      }
      submit(null, { action: page, method: 'post' });
    }, [])

    useEffect(() => {
      if(actionData && Object.keys(actionData).length > 0) {
        setTableData(actionData);
      }
    }, [actionData]);

    const getSkeletons = (number: number) => {
      const skeletons = [];
      for (let i = 1; i <= number; i++) {
        skeletons.push(<Skeleton key={`skeleton-${i}`} animation="wave" height={skeletonHeight} />); 
      }
      return skeletons;
    }

    const skeletonHeight = 50;
    return(
        <>
            <Header />
              <div className={styles.container}>
              {tableData && Object.keys(tableData).length > 0 && (
                <TableSW tableData={tableData} rowLimit={6} type={type} />
              )}
              {loaderData.loading && (!tableData || Object.keys(tableData).length === 0) && (
                <>
                  {getSkeletons(5)}
                </>
              )}
            </div>
        </>
    );
}

export default Root;