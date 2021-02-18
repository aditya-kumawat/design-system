import * as React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { FileUploader, FileUploaderList, Link } from '@/index';
import { FileUploaderComponent, FileUploaderListComponent } from './_common_/types';

export const all = () => {
  const [fileNames, setFileNames] = React.useState<any>([]);

  const title = text('title', 'Upload files');
  const formatLabel = text('Format Label', 'Accepted formats: PDF, jpg');
  const sizeLabel = text('Max size label', 'Maximum size: 25 MB');
  const multiple = boolean('multiple', true);

  const onChangeHandler = (fileList: File[]) => {
    const files = fileList.map(file => {
      return {
        file,
        status: 'completed',
      };
    });

    setFileNames(files);
  };

  return (
    <div>
      <FileUploader
        onChange={onChangeHandler}
        multiple={multiple}
        title={title}
        formatLabel={formatLabel}
        sizeLabel={sizeLabel}
        sampleFileLink={(
          <Link
            href="http://www.adobe.com/content/dam/Adobe/en/accessibility/pdfs/accessing-pdf-sr.pdf"
            download="Test.pdf"
            target="_blank"
          >
            Download sample file
          </Link>
        )}
      />
      <FileUploaderList fileList={fileNames} className="mt-4" />
    </div>
  );
};

const customCode = `() => {
  const [fileNames, setFileNames] = React.useState([]);

  const onChangeHandler = (fileList) => {
    const files = fileList.map(file => {
      return {
        file,
        status: 'completed',
      }
    });

    setFileNames(files);
  };

  return (
    <div>
      <FileUploader
        onChange={onChangeHandler}
        multiple={true}
        formatLabel='Accepted formats: PDF, jpg'
        sampleFileLink={(
          <Link
            href="http://www.adobe.com/content/dam/Adobe/en/accessibility/pdfs/accessing-pdf-sr.pdf"
            download="Test.pdf"
            target="_blank"
          >
            Download sample file
          </Link>
        )}
      />
      <FileUploaderList fileList={fileNames} className="mt-4" />
    </div>
  );
}`;

export default {
  title: 'Molecules|FileUploader',
  component: FileUploader,
  parameters: {
    docs: {
      docPage: {
        customCode,
        props: {
          components: {
            FileUploader: FileUploaderComponent,
            FileUploaderList: FileUploaderListComponent
          },
        }
      }
    }
  }
};
