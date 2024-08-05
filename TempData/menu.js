
export function getCategorizedItems(items)
{
    const itemsCategorized = {}
    Object.keys(items).forEach((itemId) =>
    {
        const item = items[itemId]
        if(item.category in itemsCategorized)
        {
            itemsCategorized[item.category].push(itemId)
        }
        else
        {
            itemsCategorized[item.category] = [itemId];
        }
    });
    return itemsCategorized;
}



