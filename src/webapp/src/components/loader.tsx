

export function withLoader(isLoading: boolean, elem: JSX.Element) {
    return isLoading ? <div>"Loading ..."</div> : elem;
}