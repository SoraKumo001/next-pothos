import { printSchema } from "graphql";
import { schema } from "../pothos/schema";

const handleRequest = () => {
  const schemaString = printSchema(schema)
    .replace(/\n/g, "\\n")
    .replace(/'/g, "\\'");
  const document = `query FindManyPost {
  findManyPost {
    id
    published
    title
    content
    authorId
    categoriesCount
    createdAt
    updatedAt
    publishedAt
  }
}`
    .replace(/\n/g, "\\n")
    .replace(/'/g, "\\'");
  const html = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Embedded Explorer</title>
		<script src="https://embeddable-explorer.cdn.apollographql.com/_latest/embeddable-explorer.umd.production.min.js"></script>
	</head>
	<body style="margin: 0; overflow-x: hidden; overflow-y: hidden; height: 100vh; width: 100vw" id="explorer"></body>
		<script>
			const getExampleSchema = () => '${schemaString}';
			new EmbeddedExplorer({
				target: '#explorer',
				initialState:{
					document: '${document}',
				},
				endpointUrl: '/graphql',
				schema: getExampleSchema(),
				handleRequest:(url, option) =>
          fetch(url, { ...option, credentials: "same-origin" })
        ,
			});
		</script>
  </html>
`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
};

export { handleRequest as GET };
