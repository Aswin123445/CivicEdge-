from sentence_transformers import SentenceTransformer, util

_model = None


def get_model():
    global _model
    if _model is None:
        _model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    return _model


def question_similarity(old, new):
    model = get_model()

    emb1 = model.encode(old, convert_to_tensor=True)
    emb2 = model.encode(new, convert_to_tensor=True)

    return util.cos_sim(emb1, emb2).item()
