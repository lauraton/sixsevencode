import { matchedData } from "express-validator";
import { PostModel } from "../models/post.model.js";
import { CommentModel } from "../models/comment.model.js";
import { UserModel } from "../models/user.model.js";

// 1. Crear publicación (Criterio 1)
export const createPost = async (req, res) => {
  try {
    // Leemos los datos desde req.userData que es donde los asigna authMiddleware
    const { idUser, id, barrio } = req.userData;
    const userId = idUser || id;

    const { titulo, contenido, categoria } = req.body;

    const newPost = await PostModel.create({
      titulo,
      contenido,
      categoria: categoria || 'EXPERIENCIA_DENGUE',
      barrio: barrio || 'General',
      user_id: userId
    });

    return res.status(201).json({ message: "Publicación creada con éxito", post: newPost });
  } catch (error) {
    console.error("Error en createPost:", error);
    return res.status(500).json({ message: "Error al crear la publicación" });
  }
};

// 2. Obtener publicaciones y filtrar por barrio (Criterio 2)
export const getPosts = async (req, res) => {
  try {
    const { barrio } = req.query;

    const whereCondition = {};
    if (barrio) {
      whereCondition.barrio = barrio;
    }

    const posts = await PostModel.findAll({
      where: whereCondition,
      include: [
        {
          model: UserModel,
          attributes: ['id', 'name', 'email']   // ✅ nombres reales del modelo
        },
        {
          model: CommentModel,
          required: false
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error exacto en getPosts:", error);
    return res.status(500).json({ 
      message: "Error al obtener las publicaciones",
      errorDetail: error.message
    });
  }
};

// 3. Comentar una publicación (Criterio 3)
export const addComment = async (req, res) => {
  try {
    // 1. Extraemos el id usando req.userData
    const { idUser, id } = req.userData;
    const userId = idUser || id;

    const { postId } = req.params;
    const { contenido } = req.body;

    // 2. Verificar que la publicación exista
    const post = await PostModel.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // 3. Crear el comentario
    const comment = await CommentModel.create({
      contenido,
      post_id: postId, // ⚠️ Asegúrate de que en la DB la columna se llame post_id o postId
      user_id: userId  // ⚠️ Asegúrate de que en la DB la columna se llame user_id o userId
    });

    return res.status(201).json({ message: "Comentario agregado con éxito", comment });
  } catch (error) {
    console.error("Error en addComment:", error); // Revisa la consola para ver el detalle en rojo
    return res.status(500).json({ message: "Error al publicar el comentario" });
  }
};

// 4. Reaccionar / Dar Me Gusta (Criterio 3)
export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostModel.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    await post.increment('meGustaCount', { by: 1 });

    return res.status(200).json({ message: "Reacción registrada", meGustaCount: post.meGustaCount + 1 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al registrar la reacción" });
  }
};