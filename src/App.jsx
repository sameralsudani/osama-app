import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Card, Button, Table } from 'react-bootstrap';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FileUploader from './FileUploader/FileUploader.jsx';
import {
  getFormUploadedDocumentsObjectFromExcelForPin15,
  getFormUploadedDocumentsObjectFromExcelForPin14,
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

  const [value, setValue] = React.useState('pin15');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value === 'pin15') {
      getFormUploadedDocumentsObjectFromExcelForPin15(
        files,
        setFormUploadedDocumentsObject
      );
    } else {
      getFormUploadedDocumentsObjectFromExcelForPin14(
        files,
        setFormUploadedDocumentsObject
      );
    }
  }, [files?.length]);

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
  const formUploadedDocumentsArrayOfArraysByExcelCategory = [
    E100KArray2,
    E40KArray2,
    E50KArray2,
    E10KArray2,
    E15KArray2,
    E5KArray2,
    E25KArray2,
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
    <main className="app-container">
      <div className="app-wrapper">
        <div className="app-header">
          <h1 className="app-title">Excel File Processor</h1>
          <p className="app-subtitle">Upload and manage your PIN files with ease</p>
        </div>

        <Row className="justify-content-center">
          <Col md={12} lg={10} xl={9}>
            <Card className="upload-card">
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <div className="radio-section">
                    <FormControl fullWidth>
                      <RadioGroup
                        aria-labelledby='demo-controlled-radio-buttons-group'
                        name='controlled-radio-buttons-group'
                        value={value}
                        onChange={handleChange}
                      >
                        <Row
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Col xs={6} sm={4} md={3}>
                            <FormControlLabel
                              value='pin15'
                              control={<Radio />}
                              label='Pin 15'
                            />
                          </Col>
                          <Col xs={6} sm={4} md={3}>
                            <FormControlLabel
                              value='pin114'
                              control={<Radio />}
                              label='Pin 14'
                            />
                          </Col>
                        </Row>
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <div className="file-upload-label">
                    📁 Please select files to upload
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
                          <th>Category</th>
                          <th>Batch</th>
                          <th>Quantity</th>
                          <th>Action</th>
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
                                    {disabledButtons[index] ? '✓ Exported' : '📥 Export'}
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
