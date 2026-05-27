const express = require('express');

const multer = require('multer');

const { put } = require('@vercel/blob');

// const { url } = await put('articles/blob.txt', 'Hello World!', { access: 'public' });

const router = express.Router();

const storage =
  multer.memoryStorage();

const upload = multer({
  storage,
});

const certificates = [];

/* =========================================
   UPLOAD CERTIFICADO
========================================= */

router.post(

  '/upload',

  upload.single('certificate'),

  async (req, res) => {

    try {

      const { studentId } = req.body;

      if (!req.file) {

        return res.status(400).json({
          error: 'Arquivo não enviado',
        });
      }

      const pathname =
        `certificados/aluno-id-${studentId}.pdf`;

      const blob = await put(

        pathname,

        req.file.buffer,

        {

          access: 'public',

          token:
            process.env.BLOB_READ_WRITE_TOKEN,

          contentType:
            'application/pdf',
        }
      );

      const existing =
        certificates.find(
          (c) =>
            c.studentId == studentId
        );

      if (existing) {

        existing.url = blob.url;

      } else {

        certificates.push({

          studentId,

          url: blob.url,
        });
      }

      res.json({

        success: true,

        url: blob.url,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        error:
          'Erro ao enviar certificado',
      });
    }
  }
);

/* =========================================
   BUSCAR CERTIFICADO
========================================= */

router.get('/:studentId', async (req, res) => {

  try {

    const certificate =
      certificates.find(

        (c) =>
          c.studentId ==
          req.params.studentId
      );

    if (!certificate) {

      return res.status(404).json({

        error:
          'Certificado não encontrado',
      });
    }

    res.json(certificate);

  } catch (error) {

    res.status(500).json({

      error:
        'Erro ao buscar certificado',
    });
  }
});

module.exports = router;