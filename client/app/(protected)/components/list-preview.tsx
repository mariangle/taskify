import Tag from "@/components/ui/tag";
import { ListEntry } from "@/types";
import { defaultEmoji } from "@/helpers/constants";

const ListPreview = ({ list }: { list: ListEntry | null }) => {
    const defaultTitle = "title is missing";
  
    return (
      <div className="flex-gap-sm">
        {list && (
          <Tag
            label={`${list.emoji || defaultEmoji} ${list.name || defaultTitle}`}
            isMissing={list.name ? false : true}
          />
        )}
      </div>
    );
  };

export default ListPreview;