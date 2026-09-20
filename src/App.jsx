import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Card, Button, Table } from 'react-bootstrap';
import FileUploader from './FileUploader/FileUploader.jsx';
import {
  getFormUploadedDocumentsObjectFromExcel,
} from './utils';
import './App.css';

import { saveAs } from 'file-saver';
import { getDateTime } from './utils';

export default function App() {
  const [formUploadedDocumentsObject, setFormUploadedDocumentsObject] =
    useState(null);

  const [files, setFiles] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState({});

  const onFileChange = (e) => setFiles(e.target.files);

  useEffect(() => {
    getFormUploadedDocumentsObjectFromExcel(
      files,
      setFormUploadedDocumentsObject
    );
  }, [files]);

  const formUploadedDocumentsArrayOfArrays =
    formUploadedDocumentsObject &&
    Object.entries(formUploadedDocumentsObject)?.map(([key, val], i) => {
      return val;
    });

  // Getting formUploadedDocumentsFlattenedArray from formUploadedDocumentsArrayOfArrays
  const formUploadedDocumentsFlattenedArray = formUploadedDocumentsArrayOfArrays
    ?.flat()
    .filter((card) => {
      return card.sn && card.pin;
    });

  // Remove duplicated cards
  const uniqueFormUploadedDocumentsFlattenedArray =
    formUploadedDocumentsFlattenedArray?.reduce((acc, current) => {
      const x = acc.find((item) => item.sn === current.sn);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

  // Excel File Categories
  let E100KArray = [];
  let E10KArray = [];
  let E40KArray = [];
  let E50KArray = [];
  let E5KArray = [];
  let E25KArray = [];
  let E15KArray = [];
  let E30KArray = [];
  let EB12Array = [];
  let EV3Array = [];
  let EV70Array = [];
  let EV200Array = [];
  let EV6Array = [];
  let ED1KArray = [];
  let ED2KArray = [];

  // We need to sort by category to create finalFormUploadedDocumentsArrayOfArrays
  uniqueFormUploadedDocumentsFlattenedArray?.forEach((row) => {
    if (row.category === 'EV1H') {
      E100KArray.push(row);
    } else if (row.category === 'EV10') {
      E10KArray.push(row);
    } else if (row.category === 'EV5') {
      E5KArray.push(row);
    } else if (row.category === 'EV25') {
      E25KArray.push(row);
    } else if (row.category === 'EV40') {
      E40KArray.push(row);
    } else if (row.category === 'EV50') {
      E50KArray.push(row);
    } else if (row.category === 'EV15') {
      E15KArray.push(row);
    } else if (row.category === 'EV30') {
      E30KArray.push(row);
    } else if (row.category === 'EB12') {
      EB12Array.push(row);
    } else if (row.category === 'EV3') {
      EV3Array.push(row);
    } else if (row.category === 'EV70') {
      EV70Array.push(row);
    } else if (row.category === 'EV200') {
      EV200Array.push(row);
    } else if (row.category === 'EV6') {
      EV6Array.push(row);
    } else if (row.category === 'ED1') {
      ED1KArray.push(row);
    } else if (row.category === 'ED2') {
      ED2KArray.push(row);
    }
  });

  let E100KArray2 = [...E100KArray];
  E100KArray2.unshift({
    category: E100KArray[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: E100KArray[0]?.expirationDate,
  });
  let E40KArray2 = [...E40KArray];
  E40KArray2.unshift({
    category: E40KArray[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: E40KArray[0]?.expirationDate,
  });
  let E50KArray2 = [...E50KArray];
  E50KArray2.unshift({
    category: E50KArray[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: E40KArray[0]?.expirationDate,
  });
  let E10KArray2 = [...E10KArray];
  E10KArray2.unshift({
    category: E10KArray[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: E10KArray[0]?.expirationDate,
  });
  let E15KArray2 = [...E15KArray];
  E15KArray2.unshift({
    category: E15KArray[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: E15KArray[0]?.expirationDate,
  });
  let E5KArray2 = [...E5KArray];
  E5KArray2.unshift({
    category: E5KArray[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: E5KArray[0]?.expirationDate,
  });
  let E25KArray2 = [...E25KArray];
  E25KArray2.unshift({
    category: E25KArray[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: E25KArray[0]?.expirationDate,
  });
  let E30KArray2 = [...E30KArray];
  E30KArray2.unshift({
    category: E30KArray[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: E30KArray[0]?.expirationDate,
  });

  E100KArray2 = E100KArray2.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
      };
    } else {
      return {
        sn: item.sn,
        pin: item.pin,
        status: item.status,
      };
    }
  });
  E25KArray2 = E25KArray2.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
      };
    } else {
      return {
        sn: item.sn,
        pin: item.pin,
        status: item.status,
      };
    }
  });
  E40KArray2 = E40KArray2.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
      };
    } else {
      return {
        sn: item.sn,
        pin: item.pin,
        status: item.status,
      };
    }
  });
  E50KArray2 = E50KArray2.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
      };
    } else {
      return {
        sn: item.sn,
        pin: item.pin,
        status: item.status,
      };
    }
  });
  E10KArray2 = E10KArray2.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
      };
    } else {
      return {
        sn: item.sn,
        pin: item.pin,
        status: item.status,
      };
    }
  });
  E15KArray2 = E15KArray2.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
      };
    } else {
      return {
        sn: item.sn,
        pin: item.pin,
        status: item.status,
      };
    }
  });
  E5KArray2 = E5KArray2.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
      };
    } else {
      return {
        sn: item.sn,
        pin: item.pin,
        status: item.status,
      };
    }
  });
  E5KArray2 = E5KArray2.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
      };
    } else {
      return {
        sn: item.sn,
        pin: item.pin,
        status: item.status,
      };
    }
  });
  E30KArray2 = E30KArray2.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
      };
    }
    return {
      sn: item.sn,
      pin: item.pin,
      status: item.status,
    };
  });
  let EB12Array2 = [...EB12Array];
  EB12Array2.unshift({
    category: EB12Array[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: EB12Array[0]?.expirationDate,
  });
  EB12Array2 = EB12Array2.map((item, index) => {
    if (index === 0) {
      return { ...item };
    }
    return {
      sn: item.sn,
      pin: item.pin,
      status: item.status,
    };
  });
  let EV3Array2 = [...EV3Array];
  EV3Array2.unshift({
    category: EV3Array[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: EV3Array[0]?.expirationDate,
  });
  EV3Array2 = EV3Array2.map((item, index) => {
    if (index === 0) {
      return { ...item };
    }
    return {
      sn: item.sn,
      pin: item.pin,
      status: item.status,
    };
  });
  let EV70Array2 = [...EV70Array];
  EV70Array2.unshift({
    category: EV70Array[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: EV70Array[0]?.expirationDate,
  });
  EV70Array2 = EV70Array2.map((item, index) => {
    if (index === 0) {
      return { ...item };
    }
    return {
      sn: item.sn,
      pin: item.pin,
      status: item.status,
    };
  });
  let EV200Array2 = [...EV200Array];
  EV200Array2.unshift({
    category: EV200Array[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: EV200Array[0]?.expirationDate,
  });
  let EV6Array2 = [...EV6Array];
  EV6Array2.unshift({
    category: EV6Array[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: EV6Array[0]?.expirationDate,
  });
  EV200Array2 = EV200Array2.map((item, index) => {
    if (index === 0) {
      return { ...item };
    }
    return {
      sn: item.sn,
      pin: item.pin,
      status: item.status,
    };
  });
  EV6Array2 = EV6Array2.map((item, index) => {
    if (index === 0) {
      return { ...item };
    }
    return {
      sn: item.sn,
      pin: item.pin,
      status: item.status,
    };
  });
  let ED1KArray2 = [...ED1KArray];
  ED1KArray2.unshift({
    category: ED1KArray[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: ED1KArray[0]?.expirationDate,
  });
  ED1KArray2 = ED1KArray2.map((item, index) => {
    if (index === 0) {
      return { ...item };
    }
    return {
      sn: item.sn,
      pin: item.pin,
      status: item.status,
    };
  });
  let ED2KArray2 = [...ED2KArray];
  ED2KArray2.unshift({
    category: ED2KArray[0]?.category,
    batch: Math.floor(Math.random() * 1000000000),
    expirationDate: ED2KArray[0]?.expirationDate,
  });
  ED2KArray2 = ED2KArray2.map((item, index) => {
    if (index === 0) {
      return { ...item };
    }
    return {
      sn: item.sn,
      pin: item.pin,
      status: item.status,
    };
  });
  const formUploadedDocumentsArrayOfArraysByExcelCategory = [
    E100KArray2,
    E40KArray2,
    E50KArray2,
    E10KArray2,
    E15KArray2,
    E5KArray2,
    E25KArray2,
    E30KArray2,
    EB12Array2,
    EV3Array2,
    EV70Array2,
    EV200Array2,
    EV6Array2,
    ED1KArray2,
    ED2KArray2,
  ];

  const finalFormUploadedDocumentsArrayOfArrays =
    formUploadedDocumentsArrayOfArraysByExcelCategory.filter((array) => {
      return array.length > 0 && array[0].category;
    });

  const onDeleteFileHandler = () => {
    setFormUploadedDocumentsObject(null);
    setFiles(null);
    setDisabledButtons({});
  };

  function exportFile(cardsArray, category, quantity, expirationDate, index) {
    setDisabledButtons(prev => ({ ...prev, [index]: true }));
    
    const exportedWithdrawnCards = cardsArray?.map((card) => {
      return `${card.sn},${card.pin},${expirationDate}\n`;
    });

    const exportedWithdrawnCardsString = exportedWithdrawnCards?.join('');
    const exportedDocument = exportedWithdrawnCardsString.trim();
    const blob = new Blob([exportedDocument], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, `${category}, ${quantity}, ${getDateTime()}.txt`);
  }

  return (
    <main className="app-container" dir="rtl">
      <div className="app-wrapper">
        <div className="app-header">
          <h1 className="app-title">معالج ملفات الإكسل</h1>
          <p className="app-subtitle">ارفع ملفات PIN وأدرها بسهولة</p>
        </div>

        <Row className="justify-content-center">
          <Col md={12} lg={10} xl={9}>
            <Card className="upload-card">
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <div className="file-upload-label">
                    📁 اختر الملفات المراد رفعها
                  </div>

                  <Row style={{ marginBottom: '20px' }}>
                    <Col sm={12} md={8} lg={6}>
                      <FileUploader
                        onSelectFile={onFileChange}
                        onDeleteFile={onDeleteFileHandler}
                        files={files}
                        accept='.xls,.csv,.xlsx'
                      />
                    </Col>
                  </Row>

                  {formUploadedDocumentsObject && (
                    <Table bordered hover responsive className='table-sm data-table'>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>الفئة</th>
                          <th>الدفعة</th>
                          <th>الكمية</th>
                          <th>الإجراء</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formUploadedDocumentsObject &&
                          finalFormUploadedDocumentsArrayOfArrays?.map(
                            (array, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td><strong>{array[0]?.category}</strong></td>
                                <td>{array[0]?.batch}</td>
                                <td><strong>{array?.length - 1}</strong></td>
                                <td>
                                  <Button
                                    type='submit'
                                    variant='primary'
                                    className="export-btn"
                                    disabled={disabledButtons[index]}
                                    onClick={() =>
                                      exportFile(
                                        array.slice(1),
                                        array?.length - 1,
                                        array[0]?.category,
                                        array[0]?.expirationDate,
                                        index
                                      )
                                    }
                                  >
                                    {disabledButtons[index] ? '✓ تم التصدير' : '📥 تصدير'}
                                  </Button>
                                </td>
                              </tr>
                            )
                          )}
                      </tbody>
                    </Table>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </main>
  );
}
