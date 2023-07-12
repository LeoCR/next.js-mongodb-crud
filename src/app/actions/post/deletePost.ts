export async function deletePost(id: string) {
  const response = await fetch(`${process.env.UI_URL}/api/post/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
