/* eslint-disable no-console */
const mongoose = require('mongoose');

const CategoryModel = require('./models/category.model');
const CategoryService = require('./services/category.service');

const ProfileModel = require('./models/profile.model');
const ProfileService = require('./services/profile.service');

const ContentTypeModel = require('./models/contentType.model');
const ContentTypeService = require('./services/contentType.service');

const UserModel = require('./models/user.model');
const UserService = require('./services/users.service');

const ContentModel = require('./models/content.model');
const ContentService = require('./services/content.service');

const categoryService = new CategoryService();
const profileService = new ProfileService();
const contentTypeService = new ContentTypeService();
const userService = new UserService();
const contentService = new ContentService();

async function initializeData() {
    try {
        // Verificar si hay contenido en la colección
        const existingCategories = await categoryService.findDB();
        const existingRoles = await profileService.findDB();
        const existingContentTypes = await contentTypeService.findDB();
        const existingUsers = await userService.findDB();
        const existingContents = await contentService.findDB();

        // Si no hay contenido, realiza la inserción inicial
        if (existingCategories == null || existingCategories.length == 0) {
            await CategoryModel.create([
                { _id: new mongoose.Types.ObjectId(), name: 'Salud', idContentType: 'TXT' },
                { _id: new mongoose.Types.ObjectId(), name: 'Deportes', idContentType: 'URL' },
                { _id: new mongoose.Types.ObjectId(), name: 'Arte', idContentType: 'IMG' }
            ]);
        }

        if (existingRoles == null || existingRoles.length == 0) {
          await ProfileModel.create([
              { _id: new mongoose.Types.ObjectId(), name: 'Lector', permissions: 'R' },
              { _id: new mongoose.Types.ObjectId(), name: 'Creador', permissions: 'CRU' },
              { _id: new mongoose.Types.ObjectId(), name: 'Administrador', permissions: 'CRUD' }
          ]);
        }

        if (existingContentTypes == null || existingContentTypes.length == 0) {
          await ContentTypeModel.create([
              { _id: new mongoose.Types.ObjectId(), name: 'TXT' },
              { _id: new mongoose.Types.ObjectId(), name: 'URL' },
              { _id: new mongoose.Types.ObjectId(), name: 'IMG' }
          ]);
        }
        if (existingUsers == null || existingUsers.length == 0) {
          await UserModel.create([
              { _id: new mongoose.Types.ObjectId(), username: 'oscarOtz', email: 'oscareduardoortizponce@gmail.com', password: 'adminadmin', idRole: 'Administrador' }
          ]);
        }

        if (existingContents == null || existingContents.length == 0) {
          await ContentModel.create([
              { _id: new mongoose.Types.ObjectId(), name: 'Prueba de texto', idContentType: 'TXT', idCategory: 'Salud', resource: 'Archivo de texto', credits: 'oscarOtz', creationDate: '29-04-2024' }
          ]);
        }
    } catch (error) {
        console.log('Error al insertar datos iniciales:', error);
    }
}

module.exports = initializeData;
