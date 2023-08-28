/* eslint-disable */
import type { Prisma, User, Organization, Workspace, WorkspaceNoteNumber, Directory, Note, Tag, NoteBlock, NoteField, NoteFieldImage, Board, Material, MaterialGroup, Invitation, NoteBlockFile, BinaryFile, NoteBlockHistory } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "organizations" | "workspaces" | "notes" | "invitations" | "binaryFile" | "noteBlockHistories";
        ListRelations: "organizations" | "workspaces" | "notes" | "invitations" | "binaryFile" | "noteBlockHistories";
        Relations: {
            organizations: {
                Shape: Organization[];
                Name: "Organization";
            };
            workspaces: {
                Shape: Workspace[];
                Name: "Workspace";
            };
            notes: {
                Shape: Note[];
                Name: "Note";
            };
            invitations: {
                Shape: Invitation[];
                Name: "Invitation";
            };
            binaryFile: {
                Shape: BinaryFile[];
                Name: "BinaryFile";
            };
            noteBlockHistories: {
                Shape: NoteBlockHistory[];
                Name: "NoteBlockHistory";
            };
        };
    };
    Organization: {
        Name: "Organization";
        Shape: Organization;
        Include: Prisma.OrganizationInclude;
        Select: Prisma.OrganizationSelect;
        OrderBy: Prisma.OrganizationOrderByWithRelationInput;
        WhereUnique: Prisma.OrganizationWhereUniqueInput;
        Where: Prisma.OrganizationWhereInput;
        Create: {};
        Update: {};
        RelationName: "workspaces" | "users" | "invitations";
        ListRelations: "workspaces" | "users" | "invitations";
        Relations: {
            workspaces: {
                Shape: Workspace[];
                Name: "Workspace";
            };
            users: {
                Shape: User[];
                Name: "User";
            };
            invitations: {
                Shape: Invitation[];
                Name: "Invitation";
            };
        };
    };
    Workspace: {
        Name: "Workspace";
        Shape: Workspace;
        Include: Prisma.WorkspaceInclude;
        Select: Prisma.WorkspaceSelect;
        OrderBy: Prisma.WorkspaceOrderByWithRelationInput;
        WhereUnique: Prisma.WorkspaceWhereUniqueInput;
        Where: Prisma.WorkspaceWhereInput;
        Create: {};
        Update: {};
        RelationName: "owner" | "users" | "directories" | "notes" | "tags" | "boards" | "invitations" | "workspaceNoteNumber" | "material" | "materialGroup" | "binaryFile";
        ListRelations: "users" | "directories" | "notes" | "tags" | "boards" | "invitations" | "workspaceNoteNumber" | "material" | "materialGroup" | "binaryFile";
        Relations: {
            owner: {
                Shape: Organization;
                Name: "Organization";
            };
            users: {
                Shape: User[];
                Name: "User";
            };
            directories: {
                Shape: Directory[];
                Name: "Directory";
            };
            notes: {
                Shape: Note[];
                Name: "Note";
            };
            tags: {
                Shape: Tag[];
                Name: "Tag";
            };
            boards: {
                Shape: Board[];
                Name: "Board";
            };
            invitations: {
                Shape: Invitation[];
                Name: "Invitation";
            };
            workspaceNoteNumber: {
                Shape: WorkspaceNoteNumber[];
                Name: "WorkspaceNoteNumber";
            };
            material: {
                Shape: Material[];
                Name: "Material";
            };
            materialGroup: {
                Shape: MaterialGroup[];
                Name: "MaterialGroup";
            };
            binaryFile: {
                Shape: BinaryFile[];
                Name: "BinaryFile";
            };
        };
    };
    WorkspaceNoteNumber: {
        Name: "WorkspaceNoteNumber";
        Shape: WorkspaceNoteNumber;
        Include: Prisma.WorkspaceNoteNumberInclude;
        Select: Prisma.WorkspaceNoteNumberSelect;
        OrderBy: Prisma.WorkspaceNoteNumberOrderByWithRelationInput;
        WhereUnique: Prisma.WorkspaceNoteNumberWhereUniqueInput;
        Where: Prisma.WorkspaceNoteNumberWhereInput;
        Create: {};
        Update: {};
        RelationName: "workspace";
        ListRelations: never;
        Relations: {
            workspace: {
                Shape: Workspace | null;
                Name: "Workspace";
            };
        };
    };
    Directory: {
        Name: "Directory";
        Shape: Directory;
        Include: Prisma.DirectoryInclude;
        Select: Prisma.DirectorySelect;
        OrderBy: Prisma.DirectoryOrderByWithRelationInput;
        WhereUnique: Prisma.DirectoryWhereUniqueInput;
        Where: Prisma.DirectoryWhereInput;
        Create: {};
        Update: {};
        RelationName: "workspace" | "parentDirectory" | "subDirectories" | "notes";
        ListRelations: "subDirectories" | "notes";
        Relations: {
            workspace: {
                Shape: Workspace;
                Name: "Workspace";
            };
            parentDirectory: {
                Shape: Directory | null;
                Name: "Directory";
            };
            subDirectories: {
                Shape: Directory[];
                Name: "Directory";
            };
            notes: {
                Shape: Note[];
                Name: "Note";
            };
        };
    };
    Note: {
        Name: "Note";
        Shape: Note;
        Include: Prisma.NoteInclude;
        Select: Prisma.NoteSelect;
        OrderBy: Prisma.NoteOrderByWithRelationInput;
        WhereUnique: Prisma.NoteWhereUniqueInput;
        Where: Prisma.NoteWhereInput;
        Create: {};
        Update: {};
        RelationName: "board" | "directory" | "workspace" | "users" | "tags" | "noteBlocks" | "noteBlockHistories";
        ListRelations: "users" | "tags" | "noteBlocks" | "noteBlockHistories";
        Relations: {
            board: {
                Shape: Board | null;
                Name: "Board";
            };
            directory: {
                Shape: Directory | null;
                Name: "Directory";
            };
            workspace: {
                Shape: Workspace;
                Name: "Workspace";
            };
            users: {
                Shape: User[];
                Name: "User";
            };
            tags: {
                Shape: Tag[];
                Name: "Tag";
            };
            noteBlocks: {
                Shape: NoteBlock[];
                Name: "NoteBlock";
            };
            noteBlockHistories: {
                Shape: NoteBlockHistory[];
                Name: "NoteBlockHistory";
            };
        };
    };
    Tag: {
        Name: "Tag";
        Shape: Tag;
        Include: Prisma.TagInclude;
        Select: Prisma.TagSelect;
        OrderBy: Prisma.TagOrderByWithRelationInput;
        WhereUnique: Prisma.TagWhereUniqueInput;
        Where: Prisma.TagWhereInput;
        Create: {};
        Update: {};
        RelationName: "workspace" | "notes";
        ListRelations: "notes";
        Relations: {
            workspace: {
                Shape: Workspace;
                Name: "Workspace";
            };
            notes: {
                Shape: Note[];
                Name: "Note";
            };
        };
    };
    NoteBlock: {
        Name: "NoteBlock";
        Shape: NoteBlock;
        Include: Prisma.NoteBlockInclude;
        Select: Prisma.NoteBlockSelect;
        OrderBy: Prisma.NoteBlockOrderByWithRelationInput;
        WhereUnique: Prisma.NoteBlockWhereUniqueInput;
        Where: Prisma.NoteBlockWhereInput;
        Create: {};
        Update: {};
        RelationName: "note" | "fields" | "file" | "noteBlockHistories";
        ListRelations: "fields" | "noteBlockHistories";
        Relations: {
            note: {
                Shape: Note;
                Name: "Note";
            };
            fields: {
                Shape: NoteField[];
                Name: "NoteField";
            };
            file: {
                Shape: NoteBlockFile | null;
                Name: "NoteBlockFile";
            };
            noteBlockHistories: {
                Shape: NoteBlockHistory[];
                Name: "NoteBlockHistory";
            };
        };
    };
    NoteField: {
        Name: "NoteField";
        Shape: NoteField;
        Include: Prisma.NoteFieldInclude;
        Select: Prisma.NoteFieldSelect;
        OrderBy: Prisma.NoteFieldOrderByWithRelationInput;
        WhereUnique: Prisma.NoteFieldWhereUniqueInput;
        Where: Prisma.NoteFieldWhereInput;
        Create: {};
        Update: {};
        RelationName: "material" | "block" | "images";
        ListRelations: "images";
        Relations: {
            material: {
                Shape: Material | null;
                Name: "Material";
            };
            block: {
                Shape: NoteBlock;
                Name: "NoteBlock";
            };
            images: {
                Shape: NoteFieldImage[];
                Name: "NoteFieldImage";
            };
        };
    };
    NoteFieldImage: {
        Name: "NoteFieldImage";
        Shape: NoteFieldImage;
        Include: Prisma.NoteFieldImageInclude;
        Select: Prisma.NoteFieldImageSelect;
        OrderBy: Prisma.NoteFieldImageOrderByWithRelationInput;
        WhereUnique: Prisma.NoteFieldImageWhereUniqueInput;
        Where: Prisma.NoteFieldImageWhereInput;
        Create: {};
        Update: {};
        RelationName: "binaryFile" | "noteField";
        ListRelations: never;
        Relations: {
            binaryFile: {
                Shape: BinaryFile | null;
                Name: "BinaryFile";
            };
            noteField: {
                Shape: NoteField;
                Name: "NoteField";
            };
        };
    };
    Board: {
        Name: "Board";
        Shape: Board;
        Include: Prisma.BoardInclude;
        Select: Prisma.BoardSelect;
        OrderBy: Prisma.BoardOrderByWithRelationInput;
        WhereUnique: Prisma.BoardWhereUniqueInput;
        Where: Prisma.BoardWhereInput;
        Create: {};
        Update: {};
        RelationName: "notes" | "workspace";
        ListRelations: "notes";
        Relations: {
            notes: {
                Shape: Note[];
                Name: "Note";
            };
            workspace: {
                Shape: Workspace;
                Name: "Workspace";
            };
        };
    };
    Material: {
        Name: "Material";
        Shape: Material;
        Include: Prisma.MaterialInclude;
        Select: Prisma.MaterialSelect;
        OrderBy: Prisma.MaterialOrderByWithRelationInput;
        WhereUnique: Prisma.MaterialWhereUniqueInput;
        Where: Prisma.MaterialWhereInput;
        Create: {};
        Update: {};
        RelationName: "group" | "workspace" | "fields";
        ListRelations: "fields";
        Relations: {
            group: {
                Shape: MaterialGroup | null;
                Name: "MaterialGroup";
            };
            workspace: {
                Shape: Workspace;
                Name: "Workspace";
            };
            fields: {
                Shape: NoteField[];
                Name: "NoteField";
            };
        };
    };
    MaterialGroup: {
        Name: "MaterialGroup";
        Shape: MaterialGroup;
        Include: Prisma.MaterialGroupInclude;
        Select: Prisma.MaterialGroupSelect;
        OrderBy: Prisma.MaterialGroupOrderByWithRelationInput;
        WhereUnique: Prisma.MaterialGroupWhereUniqueInput;
        Where: Prisma.MaterialGroupWhereInput;
        Create: {};
        Update: {};
        RelationName: "workspace" | "material";
        ListRelations: "material";
        Relations: {
            workspace: {
                Shape: Workspace;
                Name: "Workspace";
            };
            material: {
                Shape: Material[];
                Name: "Material";
            };
        };
    };
    Invitation: {
        Name: "Invitation";
        Shape: Invitation;
        Include: Prisma.InvitationInclude;
        Select: Prisma.InvitationSelect;
        OrderBy: Prisma.InvitationOrderByWithRelationInput;
        WhereUnique: Prisma.InvitationWhereUniqueInput;
        Where: Prisma.InvitationWhereInput;
        Create: {};
        Update: {};
        RelationName: "organization" | "workspace" | "inviter";
        ListRelations: never;
        Relations: {
            organization: {
                Shape: Organization;
                Name: "Organization";
            };
            workspace: {
                Shape: Workspace;
                Name: "Workspace";
            };
            inviter: {
                Shape: User;
                Name: "User";
            };
        };
    };
    NoteBlockFile: {
        Name: "NoteBlockFile";
        Shape: NoteBlockFile;
        Include: Prisma.NoteBlockFileInclude;
        Select: Prisma.NoteBlockFileSelect;
        OrderBy: Prisma.NoteBlockFileOrderByWithRelationInput;
        WhereUnique: Prisma.NoteBlockFileWhereUniqueInput;
        Where: Prisma.NoteBlockFileWhereInput;
        Create: {};
        Update: {};
        RelationName: "block" | "binaryFile";
        ListRelations: never;
        Relations: {
            block: {
                Shape: NoteBlock;
                Name: "NoteBlock";
            };
            binaryFile: {
                Shape: BinaryFile;
                Name: "BinaryFile";
            };
        };
    };
    BinaryFile: {
        Name: "BinaryFile";
        Shape: BinaryFile;
        Include: Prisma.BinaryFileInclude;
        Select: Prisma.BinaryFileSelect;
        OrderBy: Prisma.BinaryFileOrderByWithRelationInput;
        WhereUnique: Prisma.BinaryFileWhereUniqueInput;
        Where: Prisma.BinaryFileWhereInput;
        Create: {};
        Update: {};
        RelationName: "noteBlockFiles" | "user" | "workspace" | "noteFieldImage";
        ListRelations: "noteBlockFiles" | "noteFieldImage";
        Relations: {
            noteBlockFiles: {
                Shape: NoteBlockFile[];
                Name: "NoteBlockFile";
            };
            user: {
                Shape: User | null;
                Name: "User";
            };
            workspace: {
                Shape: Workspace | null;
                Name: "Workspace";
            };
            noteFieldImage: {
                Shape: NoteFieldImage[];
                Name: "NoteFieldImage";
            };
        };
    };
    NoteBlockHistory: {
        Name: "NoteBlockHistory";
        Shape: NoteBlockHistory;
        Include: Prisma.NoteBlockHistoryInclude;
        Select: Prisma.NoteBlockHistorySelect;
        OrderBy: Prisma.NoteBlockHistoryOrderByWithRelationInput;
        WhereUnique: Prisma.NoteBlockHistoryWhereUniqueInput;
        Where: Prisma.NoteBlockHistoryWhereInput;
        Create: {};
        Update: {};
        RelationName: "note" | "block" | "user";
        ListRelations: never;
        Relations: {
            note: {
                Shape: Note;
                Name: "Note";
            };
            block: {
                Shape: NoteBlock | null;
                Name: "NoteBlock";
            };
            user: {
                Shape: User;
                Name: "User";
            };
        };
    };
}