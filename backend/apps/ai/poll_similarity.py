from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")


def question_similarity(old, new):
    emb1 = model.encode(old, convert_to_tensor=True)
    emb2 = model.encode(new, convert_to_tensor=True)

    return util.cos_sim(emb1, emb2).item()
