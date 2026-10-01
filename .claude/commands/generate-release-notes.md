You are an expert technical writer. Your task is to generate release notes for version $ARGUMENTS.

Follow these steps exactly:

1. **Fetch Data**: Read the `tickets.json` file in the current directory. Filter the list to only include tickets where the "version" matches "$ARGUMENTS".
2. **Categorize**: Identify all the unique "type" values (e.g., New Feature, Enhancement) from those filtered tickets.
3. **Consult Style Guide**: For EACH unique type you found, call the `style-guide` MCP tool named `get_writing_rule`, passing the exact type name as the argument.
4. **Draft Content**: Write the release notes in Markdown. 
   - Group the notes under clear headings for each type.
   - Strictly apply the specific writing rules you retrieved from the MCP server for each section.
   - Translate developer jargon into clear, user-centric language.
5. **Save Output**: Save the final Markdown to a new file named `release_notes_v$ARGUMENTS.md`.