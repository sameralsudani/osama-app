import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Card, Button, Table } from 'react-bootstrap';
import FileUploader from './FileUploader/FileUploader.jsx';
import {
  buildExportGroups,
  getFormUploadedDocumentsObjectFromExcel,
  getFormUploadedDocumentsObjectFromTxt,
} from './utils';
import './App.css';

import { saveAs } from 'file-saver';
import { getDateTime } from './utils';

export default function App() {
  const [formUploadedDocumentsObject, setFormUploadedDocumentsObject] =
    useState(null);

  const [files, setFiles] = useState([]);
  const [txtFiles, setTxtFiles] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState({});
  const [txtDisabledButtons, setTxtDisabledButtons] = useState({});
  const [txtUploadedDocumentsObject, setTxtUploadedDocumentsObject] =
    useState(null);

  const onFileChange = (e) => setFiles(e.target.files);
  const onTxtFileChange = (e) => setTxtFiles(e.target.files);

  useEffect(() => {
    getFormUploadedDocumentsObjectFromExcel(
      files,
      setFormUploadedDocumentsObject
    );
  }, [files]);

  useEffect(() => {
    getFormUploadedDocumentsObjectFromTxt(
      txtFiles,
      setTxtUploadedDocumentsObject
    );
  }, [txtFiles]);

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

  const finalFormUploadedDocumentsArrayOfArrays = buildExportGroups(
    formUploadedDocumentsFlattenedArray || []
  );

  const txtDocumentsArrayOfArrays =
    txtUploadedDocumentsObject &&
    Object.entries(txtUploadedDocumentsObject).map(([key, val]) => val);

  const txtDocumentsFlattenedArray = txtDocumentsArrayOfArrays
    ?.flat()
    .filter((card) => card.sn && card.pin);

  const finalTxtDocumentsArrayOfArrays = buildExportGroups(
    txtDocumentsFlattenedArray || []
  );

  const onDeleteFileHandler = () => {
    setFormUploadedDocumentsObject(null);
    setFiles(null);
    setDisabledButtons({});
  };

  const onDeleteTxtFileHandler = () => {
    setTxtUploadedDocumentsObject(null);
    setTxtFiles(null);
    setTxtDisabledButtons({});
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

  function exportTxtFile(cardsArray, category, quantity, expirationDate, index) {
    setTxtDisabledButtons(prev => ({ ...prev, [index]: true }));

    const exportedWithdrawnCards = cardsArray?.map((card) =>
      `${card.sn},${card.pin},${expirationDate}`
    );
    const exportedDocument = exportedWithdrawnCards?.join('\n') || '';
    const blob = new Blob([exportedDocument], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, `${category}, ${quantity}, ${getDateTime()}.txt`);
  }

  return (
    <main className="app-container" dir="rtl">
      <div className="app-wrapper">
        <div className="app-header">
          <h1 className="app-title">معالج ملفات البطاقات</h1>
          <p className="app-subtitle">ارفع ملفات Excel أو TXT وأدرها بسهولة</p>
        </div>

        <Row className="justify-content-center">
          <Col md={12} lg={10} xl={9}>
            <Card className="upload-card">
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <div className="file-upload-label">
                    📁 رفع ملفات Excel
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
                                        array[0]?.category,
                                        array?.length - 1,
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
        <Row className="justify-content-center txt-uploader-row">
          <Col md={12} lg={10} xl={9}>
            <Card className="upload-card">
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <div className="file-upload-label">
                    📄 رفع ملفات نصية TXT
                  </div>

                  <Row style={{ marginBottom: '20px' }}>
                    <Col sm={12} md={8} lg={6}>
                      <FileUploader
                        onSelectFile={onTxtFileChange}
                        onDeleteFile={onDeleteTxtFileHandler}
                        files={txtFiles}
                        accept='.txt,text/plain'
                      />
                    </Col>
                  </Row>

                  {txtUploadedDocumentsObject && (
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
                        {finalTxtDocumentsArrayOfArrays?.map(
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
                                  disabled={txtDisabledButtons[index]}
                                  onClick={() =>
                                    exportTxtFile(
                                      array.slice(1),
                                      array[0]?.category,
                                      array?.length - 1,
                                      array[0]?.expirationDate,
                                      index
                                    )
                                  }
                                >
                                  {txtDisabledButtons[index] ? '✓ تم التصدير' : '📥 تصدير'}
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
        <div className="app-credit">By Eng Samer</div>
      </div>
    </main>
  );
}
